import React, { useContext, useState } from "react";
import {
  StyleSheet,
} from "react-native";

import DropDown from "react-native-dropdown-picker";

//stylesheet
import { globalStyle } from "../stylesheet/globalStylesheet";

export default function DropDownPicker({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: 0 },
    { label: "Banana", value: 1 }
  ]);

  return (
    // <View style={styles.contain}>
      <DropDown
        open={open}
        value={value}
        items={[
          { label: "ดูทั้งหมด", value: 0 },
          { label: "Yes", value: 1 }
        ]}
        placeholder="ดูทั้งหมด"
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={styles.dropDown}
      />
    // </View>
  );
}

const styles = StyleSheet.create({
  dropDown: {
    height: 45,
    borderRadius: 10,
    width: '100%'
  }
});
