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

import styles from "../stylesheet/screenStyle";

//sqlite
import { getDailyMedicine } from "../database/database-function";

//Components
import HeaderTitle from "../components/HeaderTitle";
import DailyCard from "../components/DailyCard";

export default function DailyScreen({ navigation }) {
  const [dailyMedicine, setDailyMedicine] = useState();
  const medicineList = useSelector((state) => state.medicine.medicine);

  const renderItem = (itemData) => {
    return (
      <View style={styles.screen}>
          <DailyCard
            title={itemData.item.notiTime}
            subTitle={itemData.item.name}
            verify={itemData.item.isNoti}
            checkBox={true}
            id={itemData.item.id}
            navigation={navigation}
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
        data={medicineList}
        renderItem={renderItem}
      />
    </View>
  );
}
