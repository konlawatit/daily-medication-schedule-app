import fb from "firebase/app";
import "firebase/auth";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import firebaseConfig from "./firebaseConfig.json";

if (!fb.apps.length) {
  console.log("Connected with firebase");
  fb.initializeApp(firebaseConfig);
}

const GoogleProvider = new fb.auth.GoogleAuthProvider();

export const firebase = !fb.apps.length
  ? fb.initializeApp(firebaseConfig)
  : fb.app();

export async function signInAnonymous() {
  await fb
    .auth()
    .signInAnonymously()
    .then(() => {
      console.log("signIn anonymous successfully");
    })
    .catch((err) => console.log("sigIn anonymous fail", err));
}

export async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      androidClientId:
        "745441194395-p60l0us8c2ia3e0t95bije801cgevafa.apps.googleusercontent.com",
      // iosClientId: YOUR_CLIENT_ID_HERE,
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      onSignIn(result);
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}

function isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId === fb.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}

function onSignIn(googleUser) {
  //   console.log("Google Auth Response", googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = fb.auth().onAuthStateChanged((firebaseUser) => {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = fb.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
      );

      // Sign in with credential from the Google user.
      fb.auth()
        .signInWithCredential(credential)
        .then((results) => {
          //do someting
          console.log("user signin google");
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    } else {
      console.log("User already signed-in Firebase.");
    }
  });
}

export async function logInFacebook() {
  try {
    await Facebook.initializeAsync({
      appId: "905477617072521",
    });
    const { type, token, expirationDate, permissions, declinedPermissions } =
      await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );

      const credential = fb.auth.FacebookAuthProvider.credential(token);
      await fb.auth()
        .signInWithCredential(credential)
        .then(() => console.log("sync facebook with firebase"))
        .catch(err => console.log('sync facebook with firebase fail', err));
      // Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      console.log("Logged in facebook", `Hi ${(await response.json()).name}!`);
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}
