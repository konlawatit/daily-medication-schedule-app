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
import { Feather,MaterialIcons,FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import DropDown from "react-native-dropdown-picker";
import { updateVerify } from "../database/database-function";
import { useDispatch } from "react-redux";
import * as Speech from 'expo-speech';


//Components
import HeaderTitle from "../components/HeaderTitle";
import MedicineCard from "../components/MedicineCard";
import DropDownPicker from "../components/DropDownPicker";

//styles
import { globalStyle } from "../stylesheet/globalStylesheet";

export default function NotificationScreen({ navigation,route }) {
  const [data, setData] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const dispatch = useDispatch();

  const toggleVerify = () => {
    updateVerify(true, route.params.data.id,dispatch,route.params.data.MEDICINE_id);
    console.log("gogo gogogog")
    navigation.navigate("Home")
  };
  const speak = () => {
    Speech.speak(("ถึงเวลาทาน "+route.params.data.name+" หมายเหตุ "+route.params.data.note),{language:"th-TH",rate:1.05});
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(85,194,255,0.5)", "transparent"]}
        style={styles.background}
      />
      <View style={styles.section1}>
        <Image
          source={{uri:route.params.data.image}}
          style={{ width: 200, height: 200}}
        />
      </View>
        <Text style={{ fontFamily: "Prompt-Regular", fontSize: 70}}>
          {route.params.data.name}
        </Text>
        <Text style={{ fontFamily: "Prompt-Light", fontSize: 36 }}>
          {route.params.data.time}
        </Text>
        <View style={styles.line} />
        <Text style={{ fontFamily: "Prompt-Light", fontSize: 24,marginBottom:"22%" }}>
          {route.params.data.note}
        </Text>
      <View style={styles.section3}>
        <View style={styles.sectionIconName}>
          <Text style={styles.textIcon}>ยกเลิก</Text>
          <Text style={styles.textIcon}>ฟังข้อมูล</Text>
          <Text style={styles.textIcon}>ยืนยัน</Text>
        </View>
        <View style={styles.sectionIcon}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ flex: 1, alignItems: "center" }}
          >
            <View>
            <MaterialIcons name="cancel" size={70} color="#f44336" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => speak()}
            style={{ flex: 1, alignItems: "center" }}
          >
            <View>
            <FontAwesome name="assistive-listening-systems" size={70} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleVerify}
            style={{ flex: 1, alignItems: "center" }}
          >
            <View>
            <Feather name="check-circle" size={70} color="#8bc34a" />
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
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#f3c7ff",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "150%",
    flex: 1,
  },
  section1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginTop:"10%"
  },
  section2: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  section3: {
    flex: 0.5,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
    paddingTop:20
  },
  icon: {
    width: 50,
    height: 50,
  },
  textIcon: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    fontFamily: "Prompt-Light",
    fontSize: 24,
  },
  sectionIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionIconName: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    borderWidth: 0.3,
    borderColor: "grey",
    width: "40%",
    margin:2
},
});
