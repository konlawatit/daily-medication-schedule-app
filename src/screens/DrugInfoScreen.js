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
import { EvilIcons } from "@expo/vector-icons";

//Components
import NotificationCard from "../components/NotificationCard";

export default function DrugInfoScreen({ navigation }) {
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
    <SafeAreaView style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(255,255,255,1)", "transparent"]}
        style={styles.background}
      />

      <View style={styles.infoContain}>
        <EvilIcons
          style={{ position: "absolute", alignSelf: "flex-end", zIndex: 100 }}
          name="pencil"
          size={54}
          color="black"
        />
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={{ flex: 0.7 }}>
            <Image
              style={{ width: "90%", height: "90%" }}
              source={require("../../assets/test.jpg")}
            />
          </View>
          <View
            style={{
              flex: 1,
              paddingRight: 15,
              paddingTop: 15,
              paddingBottom: 10,
              // justifyContent: 'center'
            }}
          >
            <View
              style={{ flexDirection: "row", height: 50, alignItems: 'flex-end', marginTop: 10 }}
            >
              <Text style={{ fontSize: 30 }}>ยาแก้ไอ</Text>
            </View>
            <View style={styles.line}></View>

            <Text style={{ fontSize: 18 }}>ทานหลังจากทานอาหาร</Text>
          </View>
        </View>

        <View style={{width: "100%", height: '100%',  borderColor: "grey", flex: 1 }}>
          <Text>คำอธิบายตัวยา</Text>
          <ScrollView >
            <Text style={{fontSize: 18}} >1111111111111111111111sssssss11111111111sssssss11111111111sssssss11111111111sssssss11111111111sssssss11111111111sssssss11111111111sssssss11111111111sssssss11111111111ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss111111111111111111111111111111111111111111111111111111111111111111111</Text>
          </ScrollView>
        </View>
      </View>

      <View style={{ width: "90%" }}>
        <Text>เวลาที่จะต้องทาน</Text>
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

const styles = StyleSheet.create({
  screen: {
    marginBottom: 15,
    alignItems: "center"
  },
  container: {
    backgroundColor: "rgba(85,194,255,0.8)",
    height: "100%",
    alignItems: "center",
    flex: 1
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "150%",
    flex: 1
  },
  textInput: {
    textAlign: "center",
    backgroundColor: "white",
    height: 40,
    borderColor: "grey",
    borderRadius: 5,
    borderWidth: 1
  },
  showLine: {
    marginTop: 8,
    width: "95%",
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "grey",
    // backgroundColor:'grey',
    opacity: 0.25,
    alignSelf: "center"
  },
  infoContain: {
    width: "90%",
    height: 350,
    // borderWidth: 2,
    // borderColor: "green",
    // flexDirection: "",
    borderRadius: 20,
    padding: 15,
    backgroundColor: "#ffff",
    shadowColor: "#000",
    elevation: 5,
    marginTop: 50
  },
  line: {
    // marginTop: 8,
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "grey",
    // backgroundColor:'grey',
    opacity: 0.25
  }
});
