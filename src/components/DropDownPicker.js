import { processFontFamily } from "expo-font";
import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Picker  
} from "react-native";

import DropDown from "react-native-dropdown-picker";
import SelectDropdown from 'react-native-select-dropdown'

//stylesheet
import { globalStyle } from "../stylesheet/globalStylesheet";

export default function DropDownPicker({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("ดูทั้งหมด");
  const [items, setItems] = useState([
    "Apple",
    "Banana"
  ]);
  const countries = ["Egypt", "Canada", "Australia", "Ireland"]
  



  return (
    // <View style={styles.contain}>
    <SelectDropdown
    buttonStyle={{borderRadius:10}}
    dropdownStyle={{borderRadius:10}}
    data={countries}
    onSelect={(selectedItem, index) => {
      console.log(selectedItem, index)
    }}
    buttonTextAfterSelection={(selectedItem, index) => {
      // text represented after item is selected
      // if data array is an array of objects then return selectedItem.property to render after item is selected
      return selectedItem
    }}
    rowTextForSelection={(item, index) => {
      // text represented for each item in dropdown
      // if data array is an array of objects then return item.property to represent item in dropdown
      return item
    }}
  />
    // </View>
  );
}

const styles = StyleSheet.create({
  dropDown: {
    height: 45,
    borderRadius: 10,
    width: '100%',
  }
});
