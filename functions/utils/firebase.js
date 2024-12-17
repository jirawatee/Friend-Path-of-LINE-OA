const { getFirestore } = require("firebase-admin/firestore");
const { initializeApp } = require("firebase-admin/app");
initializeApp();

const followersRef = getFirestore().collection("followers");

class Firebase {
  getFollower(userId) {
    return followersRef.doc(userId).get();
  }
  
  upSertFollower(userId, data) {
    return followersRef.doc(userId).set(data, { merge: true });
  }

  countUtmResource(utmSource) {
    return followersRef.where("utmSource", "==", utmSource).where("isAddedOrUnblockedFromAd", "==", true).count().get();
  }
}

module.exports = new Firebase()
