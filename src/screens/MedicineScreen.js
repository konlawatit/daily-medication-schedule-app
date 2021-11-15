import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import DropDown from "react-native-dropdown-picker";
import { useSelector } from "react-redux";

//Components
import HeaderTitle from "../components/HeaderTitle";
import MedicineCard from "../components/MedicineCard";
import DropDownPicker from "../components/DropDownPicker";

//stylesheet
import { globalStyle } from "../stylesheet/globalStylesheet";

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

  const medicineList = useSelector(state => state.medicine.medicine)
  const renderItem = (itemData) => {
    return (
      <View style={globalStyle.screen}>
        <MedicineCard
          title={itemData.item.name}
          image="checkmark.png"
          id={itemData.item.id}
          subTitle={itemData.item.note}
          navigation={navigation}
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

      <View style={{position:'absolute', justifyContent:'flex-end', flex:1, height: '100%', width:'100%'}} >
        <TouchableOpacity style={{zIndex: 100,position:'absolute', alignSelf:'flex-end'}} onPress={() => navigation.navigate("addMedicine")} >
          <Image source={require('../../assets/add.png')} />
        </TouchableOpacity>
      </View>

      <HeaderTitle title="รายการยา" />
      <View style={globalStyle.sectionFilter}>
        <View style={globalStyle.sectionTextInput}>
          <EvilIcons name="search" size={24} color="black" />
          <TextInput placeholder="ค้นหา" style={{ width: "100%" ,fontFamily:"Prompt-Light"}} />
        </View>

        <View style={globalStyle.sectionDropDown}>
          <DropDownPicker />
        </View>
      </View>

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        style={{ marginTop: 10, marginBottom: "0%" }}
        data={medicineList}
        renderItem={renderItem}
      />
    </View>
  );
}


