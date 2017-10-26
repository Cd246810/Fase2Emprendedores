const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const ref=admin.database().ref()

exports.createUserAccount = functions.auth.user().onCreate(event => {
	const uid = event.data.uid
	const email = event.data.email
	const photoUrl=event.data.photoUrl || 'http://rutafoto.png'
	const newUserRef=ref.child(´/users/${uid}´)
	return newUserRef.set({
		photoUrl:photoUrl,
		email:email
	})
})
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
//    exports.helloWorld = functions.https.onRequest((request, response) => {
//    response.send("Sí funciona Christian :D jaja!");
//    });
