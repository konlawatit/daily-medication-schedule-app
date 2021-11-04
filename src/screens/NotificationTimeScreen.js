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
import SetNotiCard from "../components/SetNotiCard";

export default function NotificationTimeScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [data, setData] = useState([
    { title: "เสียงการแจ้งเตือน", subTitle: "Homecoming" },
    { title: "ระบบสั่น", subTitle: "Homecoming" },
    { title: "ข้าม", subTitle: "5 นาที" },
    { title: "แจ้งเตือนซ้ำ" }
  ]);
  const renderItem = (itemData) => {
    return (
      <SetNotiCard
        title={itemData.item.title}
        subTitle={itemData.item.subTitle ? itemData.item.subTitle : false}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.section1}>
        <View style={styles.time}>
          <View style={styles.timeBox}>
            <Text style={styles.timeChar}>18</Text>
          </View>
          <View style={{ flex: 0.3, paddingBottom: 10 }}>
            <Text style={styles.timeChar}>:</Text>
          </View>
          <View style={styles.timeBox}>
            <Text style={styles.timeChar}>18</Text>
          </View>
        </View>
        <View style={styles.dayOfWeek}>
          <Text style={styles.dayChar}>จ.</Text>
          <Text style={styles.dayChar}>อ.</Text>
          <Text style={styles.dayChar}>พ.</Text>
          <Text style={styles.dayChar}>พฤ.</Text>
          <Text style={styles.dayChar}>ศ.</Text>
          <Text style={styles.dayChar}>ส.</Text>
          <Text style={styles.dayChar}>อา.</Text>
        </View>
        <View style={styles.line}></View>
      </View>
      <View style={styles.section2}>
        <FlatList
          data={data}
          contentContainerStyle={{
            // height: "100%",
            justifyContent: "space-evenly"
          }}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.section3}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            height: 60,
            backgroundColor: "rgba(42,42,42,1)"
          }}
        >
          <TouchableOpacity style={styles.confirmBox} onPress={() => navigation.goBack()} >
            <Text style={styles.confirmText}>ยกเลิก</Text>
          </TouchableOpacity>
          <View style={styles.confirmBox}>
            <Text style={styles.confirmText}>บันทึก</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginBottom: 15,
    alignItems: "center"
  },
  container: {
    backgroundColor: "rgba(0,0,0,1)",
    height: "100%",
    width: "100%",
    alignItems: "center",
    paddingTop: 30
  },
  section1: {
    flex: 0.5,
    width: "90%",
    marginBottom: 10,
    // height: "100%",
    // justifyContent: 'center',
    alignItems: "center",
    justifyContent: "flex-end"
  },
  section2: {
    flex: 1,
    width: "75%"
    // justifyContent: 'space-evenly'
    // height: "100%",
    // borderWidth: 1,
  },
  section3: {
    flex: 0.2,
    
    // borderWidth: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end"
    // height:
  },
  time: {
    // flex: 1,
    // height: '100%',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  timeBox: {
    // flex: 1,
    // width: 120,
    // height: 120,
    // height: '100%',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    // paddingRight: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.3)"
  },
  timeChar: {
    alignSelf: "center",
    fontSize: 80,
    color: "rgba(255,255,255,1)"
  },
  dayOfWeek: {
    width: "90%",
    // flex: 1,
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between"
    // alignContent: 'space-around'
  },
  dayChar: {
    color: "rgba(255,255,255,1)",
    fontSize: 34
    // margin: 5
  },
  line: {
    marginTop: 15,
    width: "90%",
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "grey",
    // backgroundColor:'grey',
    opacity: 0.25
    // alignSelf: "center"
  },
  setNotiBox: {
    flex: 1,
    flexDirection: "row"
  },
  textBox: {
    flex: 1
  },
  toggleBox: {
    flex: 0.3
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
  confirmBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  confirmText: {
    color: "rgba(255,210,59,1)",
    fontSize: 24
  }
});
