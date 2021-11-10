import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
  FlatList
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import styles from '../stylesheet/screenStyle'



//Components
import NotificationCard from "../components/NotificationCard";

export default function AddMedicineScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [data, setData] = useState([
    {
      time: "12:00"
    },
    {
      time: "12:00"
    },
    {
      time: "12:00"
    }
  ]);

  const renderItem = (itemData) => {
    return (
      <View style={{ alignItems: "center" }}>
        <NotificationCard />
      </View>
    );
  };


  return (
    <SafeAreaView style={styles.Addcontainer}>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(255,255,255,1)", "transparent"]}
        style={styles.background}
      />

      <TouchableOpacity style={{ width: 150, justifyContent: "flex-end" }}>
        <View style={styles.imageBox}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../../assets/test.jpg")}
          />
        </View>
        <Image
          style={styles.addButton}
          source={require("../../assets/add.png")}
        />
      </TouchableOpacity>

      <View style={{ width: "100%", alignItems: "center" }}>
        <View style={{ width: "80%", borderColor: "grey" }}>
          <Text style={styles.textThai}>ชื่อตัวยา</Text>
          <TextInput placeholder="กรอกชื่อตัวยา" style={styles.textInput} />
        </View>
        <View style={{ width: "80%", borderColor: "grey" }}>
          <Text style={styles.textThai}>หมายเหตุ</Text>
          <TextInput placeholder="หมายเหตุการใช้ยา" style={styles.textInput} />
        </View>
        <View style={{ width: "80%", borderColor: "grey" }}>
          <Text style={styles.textThai}>คำอธิบายตัวยา</Text>
          <TextInput
            style={{
              borderRadius: 5,
              backgroundColor: "white",
              padding: 5
            }}
            numberOfLines={5}
            textAlignVertical={"top"} 
            multiline
          />
        </View>
      </View>

      <View style={{ width: "90%" }}>
        <Text style={styles.textThai}>เวลาที่จะต้องทาน</Text>
        <View style={styles.showLine}></View>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        style={{ width: "100%" }}
      />
    </SafeAreaView>
  );
}