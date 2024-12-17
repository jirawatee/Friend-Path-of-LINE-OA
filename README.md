# Friend Path of LINE OA
A demo in how to track users to see which channels they added/unblocked the LINE OA from by integrating LINE Front-end Framework, LINE Messaging API, Cloud Functions for Firebase, and Cloud Firestore.

## Prerequisites
* [Learn and create a LINE Chatbot](https://developers.line.biz/en/docs/messaging-api/getting-started/) on the LINE Developers console
* [Learn and create a LIFF app](https://developers.line.biz/en/docs/liff/overview/) on the LINE Developers console
* Create a Firebase project using the [Firebase Console](https://console.firebase.google.com) and select <b>Blaze plan</b>
* Learn how to get started with Cloud Functions for Firebase by having a look at our [Getting Started Guide](https://firebase.google.com/docs/functions/get-started?gen=2nd)

## Setup
Open [/public/index.html](https://github.com/jirawatee/Friend-Path-of-LINE-OA/blob/main/public/index.html) and replace these values below
* `### FIREBASE API KEY ###`, `### FIREBASE AUTH DOMAIN ###`, `### CLOUD FUNCTIONS PROJECT ID ###` from your Firebase configuration
* `### BASIC ID ###` from your Messaging API Channel
* `### LIFF ID ###'` from your LINE Login Channel

## Features
* Survive LIFF app opening in the in-app browser
* Check the friendship between LINE OA and user
* Support LIFF app in the external browser
* Get LINE user profile
* Confirm LINE OA followers who added/unblocked the LINE OA from the ad
* Count LINE OA followers who added/unblocked the LINE OA from the ad

## Blog
* [รู้หมดใครเพิ่มเพื่อน LINE OA จากช่องทางไหน ด้วยระบบที่คุณสร้างขึ้นมาเองได้](https://medium.com/linedevth/213dd994b9a3)

## Screenshots
<table width="100%">
	<tr>
	  <th><img src="https://user-images.githubusercontent.com/1763410/42454264-3f36aee6-83b9-11e8-918d-6559fb6be89f.gif" width="100%"></th>
	  <th><img src="https://user-images.githubusercontent.com/1763410/42454265-3f7261ca-83b9-11e8-86ec-65cdaac1e2d6.gif" width="100%"></th>
	</tr>
</table>
