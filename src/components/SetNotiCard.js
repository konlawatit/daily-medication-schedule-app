import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  Switch
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import DropDown from "react-native-dropdown-picker";

//Components
import HeaderTitle from "../components/HeaderTitle";
import MedicineCard from "../components/MedicineCard";
import DropDownPicker from "../components/DropDownPicker";

export default function SetNotiCard(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const title = props.title;
  const subTitle = props.subTitle;
  return (
    <View style={{flexDirection: 'column'}} >
      <View style={styles.setNotiBox}>
        <View style={styles.textBox}>
          <Text style={styles.title}>{title}</Text>
          {subTitle !== false ? (
            <Text style={styles.subTitle}>Homecoming</Text>
          ) : (
            <View></View>
          )}
        </View>
        <View style={styles.toggleBox}>
          <Switch
            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
            trackColor={{ false: "#767577", true: "#04A438" }}
            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <View style={styles.line}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  setNotiBox: {
    flex: 1,
    flexDirection: "row",
    height: '100%',
    // height: 500
  },
  textBox: {
    flex: 1,
    justifyContent: "center"
  },
  toggleBox: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20
    // justifyContent: 'center'
  },
  title: {
    color: "white",
    fontSize: 25
  },
  subTitle: {
    color: "white",
    fontSize: 18
  },
  line: {
    marginTop: 5,
    // flex: 1,
    width: "95%",
    alignSelf: 'center',
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "grey",
    // backgroundColor:'grey',
    opacity: 0.25
    // alignSelf: "center"
  }
});
