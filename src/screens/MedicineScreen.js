import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Image
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import DropDown from "react-native-dropdown-picker";

//Components
import HeaderTitle from "../components/HeaderTitle";
import MedicineCard from "../components/MedicineCard";
import DropDownPicker from "../components/DropDownPicker";

export default function MedicineScreen({ navigation }) {
  const [data, setData] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: 0 },
    { label: "Banana", value: 1 }
  ]);

  const listData = [
    {
      time: "12:00",
      title: "ยาแก้ปวด",
      verify: true,
      note: "ทานหลังอาหาร2เม็ด"
    },
    { time: "12:00", title: "ยาแก้ปวด", verify: true },
    { time: "12:00", title: "ยาแก้ปวด", verify: true },
    {time :"12:00", title:"ยาแก้ปวด", verify: true},
    {time :"12:00", title:"ยาแก้ปวด", verify: true}
  ];

  const renderItem = (itemData) => {
    return (
      <View style={styles.screen}>
        <MedicineCard
          title={itemData.item.title}
          image="checkmark.png"
          subTitle={itemData.item.note}
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

      <View style={{position:'absolute', justifyContent:'flex-end', flex:1, height: '100%', width:'100%'}} >
        <Image style={{zIndex: 100,position:'absolute', alignSelf:'flex-end'}} source={require('../../assets/add.png')} />
      </View>

      <HeaderTitle title="รายการยา" />
      <View style={styles.sectionFilter}>
        <View style={styles.sectionTextInput}>
          <EvilIcons name="search" size={24} color="black" />
          <TextInput placeholder="ค้นหา" style={{ width: "100%" }} />
        </View>

        <View style={styles.sectionDropDown}>
          <DropDownPicker />
        </View>
      </View>

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
  sectionDropDown: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10
  },
  sectionTextInput: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    paddingRight: "10%",
    alignItems: "center",
    backgroundColor: "white"
  },
  sectionFilter: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
    height: 45
  }
});
