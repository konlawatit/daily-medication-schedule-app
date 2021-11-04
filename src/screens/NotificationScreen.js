import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import DropDown from "react-native-dropdown-picker";
import Icon from 'react-native-vector-icons/FontAwesome';

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
          navigation={navigation}
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
      <HeaderTitle title="แจ้งเตือน"/>
      <View style={styles.section1}>
      <Image 
  source={require('../../assets/test.jpg')}  
  style={{width: 250, height: 250, borderRadius: 400/ 2}} 
       />
      </View>
      <View style={styles.section2}>
          <Text style={{fontSize:48,flex:1}}>12:00 น.</Text>
          <Text style={{fontSize:36,flex:0.8}}>ยาแก้อักเสบ</Text>
          <Text style={{fontSize:24,flex:0.8}}>ทานก่อนอาหาร</Text>
      </View>
      <View style={styles.section3}>
          <View style={styles.sectionIconName}>
                <Text style={{flex:1,alignItems:"center",textAlign:"center",fontSize:18}}>ยกเลิก</Text>
                <Text style={{flex:1,alignItems:"center",textAlign:"center",fontSize:18}}>เลื่อน 5 นาที</Text>
                <Text style={{flex:1,alignItems:"center",textAlign:"center",fontSize:18}}>ยืนยัน</Text>
          </View>
          <View style={styles.sectionIcon}>
        <TouchableOpacity onPress={()=>{}} style={{flex:1,alignItems:"center"}}>
            <View>
                <Icon name="times-circle"type='font-awesome' size="48"/>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{}} style={{flex:1,alignItems:"center"}}>
            <View>
                <Icon name="history"type='font-awesome' size="48"/>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{}} style={{flex:1,alignItems:"center"}}>
            <View>
                <Icon name="check-circle"type='font-awesome' size="48"/>
            </View>
        </TouchableOpacity>
        </View>
      </View>

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
  section1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10
  },
  section2: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10
  },
  section3: {
    flex: 0.5,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 50,
  },
  icon:{
      width:50,
      height:50
  },
  sectionIcon:{
      flexDirection:"row",
      justifyContent: "center",
      alignItems: "center",
  },
  sectionIconName:{
      marginBottom:15,
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center"
  }
});
