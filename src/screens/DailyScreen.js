import React, { useContext, useEffect, useState } from "react";
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
  Dimensions,
  
  TouchableHighlight
} from "react-native";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import {globalStyle} from "../stylesheet/globalStylesheet";

//sqlite
import { getDailyMedicine } from "../database/database-function";

//Components
import HeaderTitle from "../components/HeaderTitle";
import DailyCard from "../components/DailyCard";

export default function DailyScreen({ navigation }) {
  const [dailyMedicine, setDailyMedicine] = useState();
  const timeList = useSelector((state) => state.medicine.time);

  const renderItem = (itemData) => {
    return (
      <View style={globalStyle.screen}>
          <DailyCard
            title={itemData.item.time}
            subTitle={itemData.item.name}
            verify={itemData.item.status}
            checkBox={true}
            id={itemData.item.MEDICINE_id}
            navigation={navigation}
            image={itemData.item.image}
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
        keyExtractor={(item, index) => item.id.toString()}
        style={{ marginTop: 10, marginBottom: "0%" }}
        data={timeList}
        renderItem={renderItem}
      />
    </View>
  );
}
