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
  Dimensions
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { globalStyle } from "../stylesheet/globalStylesheet";

//Components
import NotificationCard from "../components/NotificationCard";

export default function AddMedicineScreen({ navigation }) {
  // console.disableYellowBox = true;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const renderItem = (itemData) => {
    return (
      <View style={{ alignItems: "center" }}>
        <NotificationCard time={itemData.item.time} day={itemData.item.day} />
      </View>
    );
  };

  const ContentThatGoesAboveTheFlatList = ({ item, index }) => {
    const [name, setName] = useState();
    const [note, setNote] = useState();
    const [description, setDescription] = useState();
    return (
      <View style={globalStyle.Addcontainer}>
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
              value={name}
              onChangeText={setName}
              style={globalStyle.textInput}
            />
          </View>
          <View style={{ width: "80%", borderColor: "grey" }}>
            <Text style={globalStyle.textThai}>หมายเหตุ</Text>
            <TextInput
              placeholder="หมายเหตุการใช้ยา"
              style={globalStyle.textInput}
              value={note}
              onChangeText={setNote}
            />
          </View>
          <View style={{ width: "80%", borderColor: "grey" }}>
            <Text style={globalStyle.textThai}>คำอธิบายตัวยา</Text>
            <TextInput
              style={{
                borderRadius: 5,
                backgroundColor: "white",
                padding: 5
              }}
              value={description}
              onChangeText={setDescription}
              numberOfLines={5}
              textAlignVertical={"top"}
              multiline
            />
          </View>
        </View>

        <View style={{ width: "90%", marginTop: 10 }}>
          <View style={globalStyle.SectionStyle}>
            <Text style={{ fontFamily: "Prompt-Light", fontSize: 16 }}>
              เวลาที่จะต้องทาน
            </Text>
            <TouchableOpacity style={{ marginLeft: "58%" }} onPress={() => navigation.navigate("NotificationTime")} >
              <Image
                source={require("../../assets/add.png")} //Change your icon image here
                style={globalStyle.ImageStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={globalStyle.showLine}></View>
        </View>
        
        <SafeAreaView style={{ width: "100%", height: "100%" }}>
          <FlatList
            data={[]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            style={{ flex: 1, width: "100%" }}
          />
        </SafeAreaView>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, height: "150%" }}>
      <FlatList
      contentContainerStyle={{ flexGrow: 1 }}
        data={[]}
        // style={{height: '150%', flex: 1}}
        ListHeaderComponent={ContentThatGoesAboveTheFlatList}
        // ListHeaderComponent={test}

        // ListFooterComponent={test}
      />
    </SafeAreaView>
  );
}
