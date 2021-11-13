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

import {globalStyle} from "../stylesheet/globalStylesheet";


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
      <View style={globalStyle.screen}>
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
    <View style={globalStyle.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(255,255,255,1)", "transparent"]}
        style={globalStyle.background}

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
