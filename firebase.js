import fb from "firebase/app";
import "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import firebaseConfig from "./firebaseConfig.json";


if (!fb.apps.length) {
  console.log("Connected with firebase");
  fb.initializeApp(firebaseConfig);
}
console.ignoredYellowBox = ["Setting a timer"];

const GoogleProvider = new fb.auth.GoogleAuthProvider();

//sqlite
import { loginFirebase } from "./src/database/database-firebase";
import { changeMedicineState } from "./src/database/database-function";
import { getNextTriggerDateAsync } from "expo-notifications";

export const firebase = !fb.apps.length
  ? fb.initializeApp(firebaseConfig)
  : fb.app();

export async function signInAnonymous(username, password) {
  const firestore = fb.firestore();
  const usersCol = firestore.collection("users");
  const snapshot = await usersCol.get();
  let isUsername = true;
  snapshot.forEach((doc) => {
    let data = doc.data();
    console.log(doc.id, data);
    if (data.username === username) isUsername = false;
  });
  console.log("----->", isUsername);
  if (isUsername) {
    await fb
      .auth()
      .signInAnonymously()
      .then(async (results) => {
        console.log(results.user.uid);
        const uid = results.user.uid;
        await usersCol.doc(uid).set({
          username: username,
          password: password
        });
        console.log("signIn anonymous successfully");
      })
      .catch((err) => console.log("sigIn anonymous fail", err));
  }
}

export async function signInWithGoogleAsync(navigation, dispatch) {
  try {
    const result = await Google.logInAsync({
      androidClientId:
        "745441194395-p60l0us8c2ia3e0t95bije801cgevafa.apps.googleusercontent.com",
      // iosClientId: YOUR_CLIENT_ID_HERE,
      scopes: ["profile", "email"]
    });

    if (result.type === "success") {
      onSignIn(result, dispatch, navigation)
      // navigation.navigate("Home");
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
      // console.log(googleUser)
      if (
        providerData[i].providerId === fb.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.user.id
      ) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}

function onSignIn(googleUser, dispatch, navigation) {
  // const dispatch = useDispatch()
  //   console.log("Google Auth Response", googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = fb.auth().onAuthStateChanged(async (firebaseUser) => {
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
        .then(async (results) => {
          //do someting
          console.log("user signin google", results.user.uid);
          const uid = results.user.uid;
          const firestore = fb.firestore();
          const usersRef = firestore.collection("users");
          await usersRef.doc(uid).set({
            medicine: [],
            time: [],
            history: []
          });
          const payload = {
            uid: results.user.uid,
            email: results.user.email,
            provider: "google"
          };
          loginFirebase(payload);
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
      const uid = firebaseUser.uid;
      const firestore = fb.firestore();
      const usersRef = firestore.collection("users").doc(uid);
      const snapshot = await usersRef.get();
      const payloadUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        provider: "google"
      };
      const payloadData = await getAllData(payloadUser.uid)
      // console.log(payloadData)
      loginFirebase(payloadUser, payloadData, dispatch, navigation)
      

      console.log(
        "User already signed-in Firebase.",
        firebaseUser.uid,
        firebaseUser.email
      );
    }
  });
}

export async function logInFacebook() {
  try {
    await Facebook.initializeAsync({
      appId: "905477617072521"
    });
    const { type, token, expirationDate, permissions, declinedPermissions } =
      await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"]
      });
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );

      const credential = fb.auth.FacebookAuthProvider.credential(token);
      await fb
        .auth()
        .signInWithCredential(credential)
        .then(async (re) => {
          const uid = re.user.uid;
          const firestore = fb.firestore();
          const usersRef = firestore.collection("users").doc(uid);
          const snapshot = await usersRef.get();
          const payload = {
            uid: re.user.uid,
            email: re.user.email,
            provider: "facebook"
          };
          loginFirebase(payload);
          // console.log(re);
          console.log("sync facebook with firebase");
        })
        .catch((err) => console.log("sync facebook with firebase fail", err));
      // Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      // fb.auth().si;
      console.log("Logged in facebook", `Hi ${await response.json()}!`);
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}


export async function getAllData(uid) {
  try {
    const firestore = firebase.firestore();
        const userRef = firestore.collection('users').doc(uid)
        let result
        await userRef.get().then(data => {
          result = data.data()
        })
        return result
  } catch (err) {
    console.log('get all data error', err)
  }
}
