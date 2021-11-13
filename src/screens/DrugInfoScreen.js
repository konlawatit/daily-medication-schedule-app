import React, { useContext, useState,u} from "react";
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

//gloabalStylesheet
import { globalStyle } from "../stylesheet/globalStylesheet";



export default function DrugInfoScreen({ navigation }) {
  console.disableYellowBox = true;
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
        <NotificationCard navigation={navigation} />
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
            }}
          >
            <View
              style={{ flexDirection: "row", height: 50, alignItems: 'flex-end', marginTop: 10 }}
            >
              <Text style={{ fontFamily:'Prompt-Light',fontSize: 30 }}>ยาแก้ไอ</Text>
            </View>
            <View style={globalStyle.line}></View>

            <Text style={{ fontFamily:'Prompt-Light',fontSize: 18 }}>ทานหลังจากทานอาหาร</Text>
          </View>
        </View>

        <View style={{width: "100%", height: '100%',  borderColor: "grey", flex: 1 }}>
          <Text style={globalStyle.textThai}>คำอธิบายตัวยา</Text>
          <ScrollView >
            <Text style={{fontFamily:'Prompt-Light',fontSize: 18}} >ยาเมเต้กุดาไซ อิคึๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆๆ</Text>
          </ScrollView>
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
        style={{ width: "100%"}}
      />
    </SafeAreaView>
    </ScrollView>
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
  },
});
