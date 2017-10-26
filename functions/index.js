const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const ref=admin.database().ref()

exports.createUserAccount = functions.auth.user().onCreate(event => {
	const uid = event.data.uid
	const email = event.data.email
	const photoUrl=event.data.photoUrl || 'https://i.pinimg.com/736x/c6/a4/64/c6a4645d9f9af45a9c9d7b094c18a47a--portrait-ideas-girl-photos.jpg'
	const newUserRef=ref.child('/users/'+uid)
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
