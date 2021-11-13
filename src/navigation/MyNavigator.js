import React, {useEffect} from "react";
import { Button, Dimensions, Text, View, StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch } from "react-redux"

import { FontAwesome5, FontAwesome, Fontisto } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Screens
import Login from "../screens/LoginScreen";
import Register from "../screens/RegisterScreen";
import Daily from "../screens/DailyScreen";
import MedicineScreen from "../screens/MedicineScreen";
import HistoryScreen from "../screens/HistoryScreen";
import AddMedicineScreen from "../screens/AddMedicineScreen";
import DrugInfoScreen from "../screens/DrugInfoScreen";
import NotiScreen from "../screens/NotificationScreen";
import NotificationTimeScreen from "../screens/NotificationTimeScreen";
import TestNoti from "../screens/TestNoti";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#a3d0f4",
  },
};

function HomeNavigator() {
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerTitleStyle: {
          paddingTop: "10%",
          fontSize: 30,
          // opacity: 0
        },
      }}
    >
      <Tab.Screen
        name="Daily"
        component={Daily}
        options={{
          animation: "slide_from_right",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Medicine"
        component={MedicineScreen}
        options={{
          animation: "slide_from_right",
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="drug-pack" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          animation: "slide_from_right",
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="history" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ReqNoti"
        component={TestNoti}
        options={{ animation: "slide_from_right" }}
      />
    </Tab.Navigator>
  );
}

// สร้าง Navigator หลัก
import { initDB, delDB } from "../database/database-function";
export default function MyNavigator() {
  const dispatch = useDispatch();

  useEffect(() => {
    delDB()
    initDB(dispatch)
  }, [])


  return (
    <NavigationContainer
    // theme={MyTheme}
    >
      {/* <LoginNavigator /> */}

      <Stack.Navigator
        // mode="modal"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Noti" component={NotiScreen} />
        <Stack.Screen
          name="Home"
          component={HomeNavigator}
          options={{ animation: "slide_from_right" }}
        />

        <Stack.Screen
          name="MedicineStack"
          component={MedicineScreen}
          options={{
            headerShown: false,
            headerTitle: (props) => <Text>'tets'</Text>,
            headerRight: () => (
              <Button
                onPress={() => alert("This is a button!")}
                title="Info"
                color="#fff"
              />
            ),
          }}
        />

        <Stack.Screen
          name="DrugInfo"
          component={DrugInfoScreen}
          options={{
            title: "ข้อมูลยา",
            headerShown: true,
            headerTitleStyle: {
              fontFamily: "Prompt-Light",
              color: "#0080fe",
            },
          }}
        />
        <Stack.Screen
          name="NotificationTime"
          component={NotificationTimeScreen}
        />
        <Stack.Screen
          name="addMedicine"
          component={AddMedicineScreen}
          options={{
            title: "เพิ่มข้อมูลยา",
            headerShown: true,
            headerTitleStyle: {
              fontFamily: "Prompt-Light",
              color: "#0080fe",
            },
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
