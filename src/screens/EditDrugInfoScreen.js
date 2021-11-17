import React, { useContext, useState, u } from "react";
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
import { EvilIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
//Components
import NotificationCard from "../components/NotificationCard";

//gloabalStylesheet
import { globalStyle } from "../stylesheet/globalStylesheet";

export default function EditDrugInfoScreen({ navigation, route }) {
  // console.disableYellowBox = true;
  const medicineInfo = useSelector((state) => state.medicine.selectMedicine);
  console.log(medicineInfo);
  // const [id, setId] = useState(route.params.id);
  const [id, setId] = useState(1);
  const selectTimeList = useSelector((state) => {
    const time = state.medicine.time;
    return time.filter((data) => data.MEDICINE_id == id);
  });

  
  const renderItem = (itemData) => {
    return (
      <View style={{ alignItems: "center" }}>
        <NotificationCard
          navigation={navigation}
          time={itemData.item.time}
          day={itemData.item.day}
          />
      </View>
    );
  };
  
  const ContentThatGoesAboveTheFlatList = () => {
    const [name, setName] = useState(medicineInfo.name);
    const [note, setNote] = useState(medicineInfo.note);
    const [description, setDescription] = useState(medicineInfo.description);
    const [image, setImage] = useState(medicineInfo.image);
    return (
      <SafeAreaView style={[globalStyle.Addcontainer]}>
        <LinearGradient
          // Background Linear Gradient
          colors={["rgba(255,255,255,1)", "transparent"]}
          style={globalStyle.background}
        />

        <View style={styles.infoContain}>
          <EvilIcons
            style={{
              position: "absolute",
              alignSelf: "flex-end",
              zIndex: 100
            }}
            name="pencil"
            size={54}
            color="black"
          />
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ flex: 0.7 }}>
              {medicineInfo.image ? (
                <Image
                  style={{ width: "90%", height: "90%" }}
                  source={{ uri: image }}
                />
              ) : (
                <Image
                  style={{ width: "90%", height: "90%" }}
                  source={require("../../assets/test.jpg")}
                />
              )}
            </View>
            <View
              style={{
                flex: 1,
                paddingRight: 15,
                paddingTop: 15,
                paddingBottom: 10
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  height: 50,
                  alignItems: "flex-end",
                  marginTop: 10
                }}
              >
                <TextInput
                  style={{ fontFamily: "Prompt-Light", fontSize: 30, width: "100%" }}
                  value={name}
                  onChangeText={setName}
                />
              </View>
              <View style={globalStyle.line}></View>

              <TextInput
                  placeholder="หมายเหตุ"
                  style={{ fontFamily: "Prompt-Light", fontSize: 18, width: "100%" }}
                  value={note}
                  onChangeText={setNote}
                />
            </View>
          </View>

          <View
            style={{
              width: "100%",
              height: "100%",
              borderColor: "grey",
              flex: 1
            }}
          >
            <Text style={globalStyle.textThai}>คำอธิบายตัวยา</Text>
            <TextInput
            placeholder="กรอกคำอธิบายตัวยา"
                  style={{ fontFamily: "Prompt-Light", fontSize: 18, width: "100%", }}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                />
          </View>
        </View>
        <View style={{ width: "90%", marginTop: 10 }}>
          <View style={globalStyle.SectionStyle}>
            <Text style={{ fontFamily: "Prompt-Light", fontSize: 16 }}>
              เวลาที่จะต้องทาน
            </Text>
            <TouchableOpacity
              style={{ marginLeft: "58%" }}
              onPress={() =>
                navigation.navigate("NotificationTime", { id: medicineInfo.id })
              }
            >
              <Image
                source={require("../../assets/add.png")} //Change your icon image here
                style={globalStyle.ImageStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={globalStyle.showLine}></View>
        </View>

        <FlatList
          data={selectTimeList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          style={{ flex: 1, width: "100%" }}
        />
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        data={[]}
        ListHeaderComponent={ContentThatGoesAboveTheFlatList}
        // ListFooterComponent={ContentThatGoesBelowTheFlatList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  infoContain: {
    width: "90%",
    height: 350,
    borderRadius: 20,
    padding: 15,
    backgroundColor: "#ffff",
    shadowColor: "#000",
    elevation: 5,
    marginTop: 20
  }
});
