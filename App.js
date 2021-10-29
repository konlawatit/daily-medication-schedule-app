import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//firebase
// import firebase from 'firebase';
// import firebaseConfig from './firebaseConfig.json'

//sqlite
import { DatabaseConnection } from "./src/database/database-connection";
const db = DatabaseConnection.getConnection();

//Screens
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import DashboardScreen from "./src/screens/DashboardScreen";

//Context
import AppContext from "./src/components/AppContext";

//Navigation
import MyNavigator from "./src/navigation/MyNavigator"


const Stack = createNativeStackNavigator();



export default function App() {
  return (
    // <LoginScreen />
    <MyNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
