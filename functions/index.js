const { onCall, onRequest, HttpsError } = require("firebase-functions/v2/https");

// Import LINE and Firebase modules
const firebase = require("./utils/firebase");
const line = require("./utils/line");

exports.myCallable = onCall(async (request) => {
  // Get LINE user profile via accessToken from LIFF app
  const profile = await line.getUserProfile(request.data.accessToken);
  if (profile >= 400) {
    throw new HttpsError("failed-precondition", "The function must be called with a valid accessToken");
  }

  // Insert or update data of clicking ad by the user to Firestore
  await firebase.upSertFollower(profile.userId, {
    utmSource: request.data.utmSource,
    timestamp: Date.now(),
    isAddedOrUnblockedFromAd: false
  });
  
  return request.data.utmSource;
});

exports.webhook = onRequest(async (req, res) => {
  for (const event of req.body.events) {
    switch (event.type) {
      case "follow": {
        const doc = await firebase.getFollower(event.source.userId);
        let isAddedOrUnblockedFromAd = (doc.exists) ? doc.data().isAddedOrUnblockedFromAd : false;
        const utmSource = (doc.exists) ? doc.data().utmSource : "none";
        const timestamp = (doc.exists) ? doc.data().timestamp : Date.now();

        // No need to update the database if the user who added/unblocked the LINE OA from the ad is confirmed.
        if (isAddedOrUnblockedFromAd) { break; }

        if (doc.exists) {
          const expectedTimeToAdd = 1000 * 60 * 1;
          const gapTimeOfAdding = Date.now() - doc.data().timestamp;
          
          // No need to update the database if the time between clicking on the ad and adding/unblocking the LINE OA is more than 1 min
          if (gapTimeOfAdding > expectedTimeToAdd) { break; }
        }

        // isAddedOrUnblockedFromAd will always be FALSE if utmSource is "none" 
        isAddedOrUnblockedFromAd = (utmSource !== "none");
        
        await firebase.upSertFollower(event.source.userId, {
          isAddedOrUnblockedFromAd,
          utmSource,
          timestamp
        });
        break;
      }
    }
  }
  res.send("ok");
});


exports.count = onRequest(async (req, res) => {
  const utmSource = (req.query.utm_source || "none");
  const snapshot = await firebase.countUtmResource(utmSource);
  res.send(`The number of followers who added/unblocked the LINE OA from <b>${utmSource}</b> is <b>${snapshot.data().count}</b>`);
});