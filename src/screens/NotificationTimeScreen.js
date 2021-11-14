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
import ScrollPicker from "react-native-wheel-scrollview-picker";

//Components
import SetNotiCard from "../components/SetNotiCard";

export default function NotificationTimeScreen({ navigation }) {
  const [selectedItem, setSelectedItem] = useState(2);
  const [itemList, setItemList] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5"
  ]);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [hour, setHour] = useState();
  const [min, setMin] = useState();
  const [hourIndex, setHourIndex] = useState(1);
  const [minIndex, setMinIndex] = useState(1);
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
        <View style={[styles.time]}>
          {/* <View
            style={{
              borderRadius: 10,
              paddingLeft: 10,
              paddingRight: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.3)"
            }}
          > */}
            <ScrollPicker
            wrapperColor ="rgba(255,255,255,0)"
              dataSource={["01", "02", "03", "04", "05", "06"]}
              selectedIndex={1}
              style={{ backgroundColor: "black" }}
              renderItem={(data, index) => {
                return (
                  <View >
                    <Text style={[styles.timeChar, {color: index == hourIndex ? 'white' : 'rgba(255,255,255,0.5)'}]}>{data}</Text>
                  </View>
                );
              }}
              onValueChange={(data, selectedIndex) => {
                //
                setHourIndex(selectedIndex);
                setHour(data);
                console.log(data, selectedIndex);
              }}
              wrapperHeight={180}
              wrapperWidth={150}
              itemHeight={65}
              highlightColor="#C5C5C5"
              highlightBorderWidth={2}
            />
          {/* </View> */}
          {/* <View style={styles.timeBox}>
            <Text style={styles.timeChar}>18</Text>
          </View> */}
          <View style={{ flex: 0, paddingBottom: 10 }}>
            <Text style={styles.timeChar}>:</Text>
          </View>
          <ScrollPicker
          wrapperColor ="rgba(255,255,255,0)"
              dataSource={["01", "02", "03", "04", "05", "06"]}
              selectedIndex={1}
              style={{ backgroundColor: "black" }}
              renderItem={(data, index) => {
                return (
                  <View >
                    <Text style={[styles.timeChar, {color: index == minIndex ? 'white' : 'rgba(255,255,255,0.5)'}]}>{data}</Text>
                  </View>
                );
              }}
              onValueChange={(data, selectedIndex) => {
                //
                setMinIndex(selectedIndex);
                setMin(data);
                console.log(data, selectedIndex);
              }}
              wrapperHeight={180}
              wrapperWidth={150}
              itemHeight={65}
              highlightColor="#C5C5C5"
              highlightBorderWidth={2}
            />
          {/* <View style={styles.timeBox}>
            <Text style={styles.timeChar}>18</Text>
          </View> */}
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
          <TouchableOpacity
            style={styles.confirmBox}
            onPress={() => navigation.goBack()}
          >
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
    flex: 0.9,
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
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.3)"
  },
  timeChar: {
    alignSelf: "center",
    fontSize: 50,
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
    fontSize: 34,
    fontFamily: "Prompt-Light"
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
  confirmBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  confirmText: {
    color: "rgba(255,210,59,1)",
    fontSize: 24,
    fontFamily: "Prompt-Light"
  }
});
