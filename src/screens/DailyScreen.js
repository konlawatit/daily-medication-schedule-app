import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  CheckBox,
  ScrollView,
  SafeAreaView,
  FlatList,
  Dimensions
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { signInWithGoogleAsync, logInFacebook } from "../../firebase";

//Components
import HeaderTitle from "../components/HeaderTitle";
import DailyCard from "../components/DailyCard";

export default function DailyScreen({ navigation }) {
  const [data, setData] = useState(false);

  const listData = [
    { time: "12:00", title: "ยาแก้ปวด", verify: true },
    // { time: "12:00", title: "ยาแก้ปวด", verify: true },
    // { time: "12:00", title: "ยาแก้ปวด", verify: true },
    // {time :"12:00", title:"ยาแก้ปวด", verify: true},
    // {time :"12:00", title:"ยาแก้ปวด", verify: true}
  ];

  const renderItem = (itemData) => {
    return (
      <View style={styles.screen}>
        <DailyCard
          title={itemData.item.time}
          subTitle={itemData.item.title}
          verify={itemData.item.verify}
          checkBox={true}
          image="checkmark.png"

        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(255,255,255,1)", "transparent"]}
        style={styles.background}

      />

      <HeaderTitle title="ยาที่ต้องทานวันนี้" />

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        style={{ marginTop: 10, marginBottom: "0%" }}
        data={listData}
        renderItem={renderItem}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginBottom: 15,
    alignItems: "center"
  },
  container: {
    backgroundColor: "rgba(85,194,255,0.8)",
    height: "100%"
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "150%",
    flex: 1
  },
  line: {
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "grey",
    opacity: 0.25
  },
  card: {
    width: "90%",
    borderWidth: 2,
    borderColor: "green",
    flexDirection: "row",
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#ffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginBottom: 10
  },
  card2: {
    width: "90%",
    borderWidth: 2,
    borderColor: "grey",
    flexDirection: "row",
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#ffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginBottom: 10
  }
});
