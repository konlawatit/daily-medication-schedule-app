import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, version } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createStore, combineReducers } from "redux"
import { Provider, useDispatch } from "react-redux"


import medicineReducer from "./src/store/reducers/medicineReducer";

const rootReducer = combineReducers({
  medicine: medicineReducer
})

const store = createStore(rootReducer);

//firebase
// import firebase from 'firebase';
// import firebaseConfig from './firebaseConfig.json'

//sqlite
import { DatabaseConnection } from "./src/database/database-connection";
import { initDB, dropDB } from "./src/database/database-function";
const db = DatabaseConnection.getConnection();

//Screens
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import DashboardScreen from "./src/screens/DashboardScreen";

//Context
import AppContext from "./src/components/AppContext";

//Navigation
import MyNavigator from "./src/navigation/MyNavigator";

//Fonts by npm install expo-font and expo-app-loading
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

const Stack = createNativeStackNavigator();


const getFonts = () =>
  Font.loadAsync({
    "Prompt-Regular": require("./assets/fonts/Prompt-Regular.ttf"),
    "Prompt-Light": require("./assets/fonts/Prompt-Light.ttf")
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  

  useEffect(() => {
    // dropDB();
    // initDB(dispatch);
  }, [])

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={getFonts}
        onError={() => console.log("Cannot loaded fonts")}
        onFinish={() => setFontsLoaded(true)}
      ></AppLoading>
    );
  }
  return (
    <Provider store={store} >
      <MyNavigator />
    </Provider>
  )
}

