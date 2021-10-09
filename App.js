import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import HomeScreen from "./screens/HomeScreen";
import DashboardScreen from "./screens/DashboardScreen";

//Context
import AppContext from "./components/AppContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [name, setName] = useState("Bas");
  const [age, setAge] = useState();

  const user = {
    name,
    age,
    setName,
    setAge,
  };

  return (
    <AppContext.Provider value={{user}} >
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
