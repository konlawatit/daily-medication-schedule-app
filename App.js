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
import DashboardScreen from "./src/screens/DashboardScreen";

//Context
import AppContext from "./src/components/AppContext";


const Stack = createNativeStackNavigator();



export default function App() {
  

  const [uid, setUID] = useState("it6207007");
  const [name, setName] = useState("Bas");
  const [age, setAge] = useState(21);

  

  useEffect(() => {
    
    db.transaction((tx) => {
      // tx.executeSql("DROP TABLE USERS", []);
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS USERS (uid varchar(255) PRIMARY KEY, name varchar(255), age INT)`,
        [],
        (tx, results) => {
          console.log("create table successfully");
        },
        (error) => console.log("craete table error", error)
      );

      tx.executeSql(
        `select uid from USERS where uid='${uid}'`,
        [],
        (tx, results) => {
          if (results.rows.length === 0) {
            tx.executeSql(
              `INSERT INTO USERS (uid, name, age) VALUES (?, ?, ?)`,
              [uid, name, age],
              (tx, results) => console.log("insert successfully"),
              (error) => console.log(2, error)
            );
          }

          // tx.executeSql(
          //   `SELECT * FROM USERS`,
          //   [],
          //   (tx, results) => console.log(results.rows),
          //   (error) => console.log(error)
          // );
        },
        (error) => console.log(error)
      );
    });
  }, []);

  const user = {
    name,
    age,
    setName,
    setAge,
  };

  return (
    <AppContext.Provider value={{ user }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Welcome" }}
          />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
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
