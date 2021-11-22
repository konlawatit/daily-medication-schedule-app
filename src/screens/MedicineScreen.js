import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Platform
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
  const [search, setSearch] = useState("")
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  var medicineList = useSelector(state => state.medicine.medicine)
  const   updateSearch = (text) => {
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = medicineList.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(medicineList);
      setSearch(text);
    }
  };
  const renderItem = (itemData) => {
    return (
      <View style={globalStyle.screen}>
        <MedicineCard
          title={itemData.item.name}
          image={itemData.item.image}
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

      
      {Platform.OS == "ios" ? (
       <TouchableOpacity style={{position:'absolute',zIndex:100,bottom:0,right:0}} onPress={() => navigation.navigate("addMedicine")} >
          <Image source={require('../../assets/add.png')} />
        </TouchableOpacity> 
        
      ) : (
        <View style={{position:'absolute', justifyContent:'flex-end', flex:1, height: '100%', width:'100%'}} >
        <TouchableOpacity style={{zIndex: 100,position:'absolute', alignSelf:'flex-end'}} onPress={() => navigation.navigate("addMedicine")} >
          <Image source={require('../../assets/add.png')} />
        </TouchableOpacity>
      </View>
      )}


      <HeaderTitle title="รายการยา" />
      <View style={globalStyle.sectionFilter}>
        <View style={globalStyle.sectionTextInput}>
          <EvilIcons name="search" size={24} color="black" />
          <TextInput placeholder="ค้นหา" style={{ width: "100%" ,fontFamily:"Prompt-Light"}} />
        </View>

      </View>

      <FlatList
        keyExtractor={(item, index) => item.id.toString()}
        style={{ marginTop: 10, marginBottom: "0%" }}
        data={medicineList}
        renderItem={renderItem}
      />
    </View>
  );
}


