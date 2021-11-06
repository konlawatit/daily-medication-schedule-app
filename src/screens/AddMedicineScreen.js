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
  Linking
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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
    <SafeAreaView style={styles.container}>
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
          <Text>ชื่อตัวยา</Text>
          <TextInput placeholder="กรอกชื่อตัวยา" style={styles.textInput} />
        </View>
        <View style={{ width: "80%", borderColor: "grey" }}>
          <Text>หมายเหตุ</Text>
          <TextInput placeholder="หมายเหตุการใช้ยา" style={styles.textInput} />
        </View>
        <View style={{ width: "80%", borderColor: "grey" }}>
          <Text>คำอธิบายตัวยา</Text>
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
        <View style={{flexDirection: "row", width: '90%', alignItems: 'center', alignSelf: 'center'}}>
          <Text style={{flex: 1}} >เวลาที่จะต้องทาน</Text>
          <TouchableOpacity style={{flex: 1, marginLeft: 5, borderWidth: 0}} >
            <Image style={{width: 30, height: 30, alignSelf: 'flex-end'}} source={require('../../assets/add.png')} />
            {/* //แก้ไอคอนได้เลยคับ  */}
          </TouchableOpacity>
        </View>
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
  imageBox: {
    width: 150,
    height: 150,
    overflow: "hidden",
    borderRadius: 150,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  addButton: {
    position: "absolute",
    alignSelf: "flex-end",
    right: -5,
    width: 50,
    height: 50
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
  daysOfweek: {
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    color: "white"
  },
  cardMedicine: {
    flexDirection: "row",
    backgroundColor: "rgba(85,194,255,8)",
    width: "90%",
    height: 100,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.39,
    shadowRadius: 100.3,

    elevation: 5
  }
});
