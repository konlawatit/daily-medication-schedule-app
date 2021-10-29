import React from "react";
import { Dimensions, Text, View, StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Screens
import Login from "../screens/LoginScreen";
import Register from "../screens/RegisterScreen";
import Daily from "../screens/DailyScreen";
import MedicineScreen from "../screens/MedicineScreen";
import HistoryScreen from "../screens/HistoryScreen";

function LoginNavigation() {
  return (
    <Stack.Navigator
      // mode="modal"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Home"
        component={HomeNavigation}
        options={{ animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  );
}

function LineTitle() {
  return (
    <View>
      <Text>ยาที่ต้องทานในวันนี้</Text>
      <View></View>
    </View>
  );
}

function HeaderTitle(props) {
  return (
    <View style={styles.headerTitleContain}>
      <View style={styles.line}></View>
      <View>
        <Text style={styles.title}>{props.name}</Text>
        <View style={styles.line2}></View>
      </View>
    </View>
  );
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "rgba(255,255,255,1)"
  }
};

function HomeNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerTitleStyle: {
          paddingTop: "10%",
          fontSize: 30
          // opacity: 0
        }
      }}
    >
      <Tab.Screen
        name="Daily"
        component={Daily}
        options={{
          animation: "slide_from_right"
        }}
      />
      <Tab.Screen
        name="Medicine"
        component={MedicineScreen}
        options={{ animation: "slide_from_right" }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{ animation: "slide_from_right" }}
      />
    </Tab.Navigator>
  );
}

// สร้าง Navigator หลัก
export default function MyNavigator() {
  return (
    <NavigationContainer
    // theme={MyTheme}
    >
      <LoginNavigation />
    </NavigationContainer>
  );
}

let styles = StyleSheet.create({
  title: {
    fontSize: 25
  },
  headerTitleContain: {
    paddingTop: "5%",
    width: "100%",
    alignItems: "center",
    flex: 1
  },
  line: {
    width: Dimensions.get("screen").width,
    height: 10
    // backgroundColor:'red',
  },
  line2: {
    marginTop: 8,
    width: (Dimensions.get("screen").width * 90) / 100,
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "grey",
    // backgroundColor:'grey',
    opacity: 0.25
  }
});
