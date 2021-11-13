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
  FlatList,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { globalStyle } from "../stylesheet/globalStylesheet";

//Components
import NotificationCard from "../components/NotificationCard";

export default function AddMedicineScreen({ navigation }) {
  console.disableYellowBox = true;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [data, setData] = useState([
    {
      time: "12:00",
    },
    {
      time: "12:00",
    },
    {
      time: "12:00",
    },
  ]);

  const renderItem = (itemData) => {
    return (
      <View style={{ alignItems: "center" }}>
        <NotificationCard />
      </View>
    );
  };

  return (
    <ScrollView>
      <SafeAreaView style={globalStyle.Addcontainer}>
        <LinearGradient
          // Background Linear Gradient
          colors={["rgba(255,255,255,1)", "transparent"]}
          style={globalStyle.background}
        />

        <TouchableOpacity style={{ width: 150, justifyContent: "flex-end" }}>
          <View style={globalStyle.imageBox}>
            <Image
              style={{ width: "100%", height: "100%" }}
              source={require("../../assets/test.jpg")}
            />
          </View>
          <Image
            style={globalStyle.addButton}
            source={require("../../assets/add.png")}
          />
        </TouchableOpacity>

        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={{ width: "80%", borderColor: "grey" }}>
            <Text style={globalStyle.textThai}>ชื่อตัวยา</Text>
            <TextInput
              placeholder="กรอกชื่อตัวยา"
              style={globalStyle.textInput}
            />
          </View>
          <View style={{ width: "80%", borderColor: "grey" }}>
            <Text style={globalStyle.textThai}>หมายเหตุ</Text>
            <TextInput
              placeholder="หมายเหตุการใช้ยา"
              style={globalStyle.textInput}
            />
          </View>
          <View style={{ width: "80%", borderColor: "grey" }}>
            <Text style={globalStyle.textThai}>คำอธิบายตัวยา</Text>
            <TextInput
              style={{
                borderRadius: 5,
                backgroundColor: "white",
                padding: 5,
              }}
              numberOfLines={5}
              textAlignVertical={"top"}
              multiline
            />
          </View>
        </View>
        <View style={{ width: "90%", marginTop: 10 }}>
          <View style={globalStyle.SectionStyle}>
            <Text style={{ fontFamily: "Prompt-Light",fontSize:16 }}>เวลาที่จะต้องทาน</Text>
            <TouchableOpacity style={{marginLeft:"58%"}}>
            <Image
              source={require("../../assets/add.png")} //Change your icon image here
              style={globalStyle.ImageStyle}
            /></TouchableOpacity>
          </View>
          <View style={globalStyle.showLine}></View>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          style={{ width: "100%" }}
        />
      </SafeAreaView>
    </ScrollView>
  );
}
