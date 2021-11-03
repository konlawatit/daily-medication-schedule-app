import React from "react";
import { Button, Dimensions, Text, View, StyleSheet } from "react-native";
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
import AddMedicineScreen from "../screens/AddMedicineScreen";
import DrugInfoScreen from "../screens/DrugInfoScreen";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "rgba(255,255,255,1)"
  }
};

function HomeNavigator() {
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
      {/* <LoginNavigator /> */}

      <Stack.Navigator
        // mode="modal"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="drugInfo" component={DrugInfoScreen} />
        {/* <Stack.Screen name="Login" component={Login} /> */}
        {/* <Stack.Screen
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
            )
          }}
        />

        <Stack.Screen
          name="addMedicine"
          component={AddMedicineScreen}
          options={{ title: "เพิ่มข้อมูลยา", headerShown: true }}
        /> */}
      </Stack.Navigator>
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
