import React, { useContext, useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import { globalStyle } from "../stylesheet/globalStylesheet";

//Components
import NotificationCard from "../components/NotificationCard";

import { addMedicine } from "../database/database-function";
import { clearStackTime } from "../store/actions/medicineAction";

export default function AddMedicineScreen({ navigation }) {
  // console.disableYellowBox = true;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const timeList = useSelector((state) => state.medicine.stackTime);

  const [confirmName, setConfirmName] = useState();
  const [confirmNote, setConfirmNote] = useState();
  const [confirmDescription, setConfirmDescription] = useState();
  const [isSave, setIsSave] = useState(false);

  const [check, setCheck] = useState(false);

  let dispatch = useDispatch()
  const save = (name, note, description) => {
    if (name) {
      addMedicine(name, note, description, timeList, dispatch)
      dispatch(clearStackTime())
      navigation.navigate("Medicine")
    }
    console.log(name, note, description)
  };

  const cancle = () => {
    navigation.goBack()
    dispatch(clearStackTime())
  }

  const confirm = () => {
    setCheck(!check)
    let payload = {};
  };

  const renderItem = (itemData) => {
    return (
      <View style={{ alignItems: "center" }}>
        <NotificationCard time={itemData.item.time} day={itemData.item.day} />
      </View>
    );
  };

  const ContentThatGoesAboveTheFlatList = (save) => {
    const [name, setName] = useState();
    const [note, setNote] = useState();
    const [description, setDescription] = useState();

    useEffect(() => {
      let payload = {
        name,
        note,
        description
      }

      save(name, note, description)

      // console.log(note)
      
    }, [check]);

    return (
      <View style={[globalStyle.Addcontainer]}>
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
            <TouchableOpacity
              style={{ marginLeft: "58%" }}
              onPress={() => navigation.navigate("NotificationTime")}
            >
              <Image
                source={require("../../assets/add.png")} //Change your icon image here
                style={globalStyle.ImageStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={globalStyle.showLine}></View>
        </View>

        <SafeAreaView style={{ width: "100%", height: "100%", marginBottom: 50 }}>
          <FlatList
            data={timeList}
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
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        data={[]}
        // style={{height: '150%', flex: 1}}
        ListHeaderComponent={ContentThatGoesAboveTheFlatList(save)}
      />

      <View style={styles.section3}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            height: 60,
            backgroundColor: "rgba(255,255,255,1)"
          }}
        >
          <TouchableOpacity
            style={styles.confirmBox}
            onPress={() => cancle()}
          >
            <Text style={styles.confirmText}>ยกเลิก</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmBox} onPress={() => confirm()}>
            <Text style={styles.confirmText}>บันทึก</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section3: {
    flex: 1,
    width: "100%",
    position: "absolute",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    // height: ,
    bottom: 0,
  },
  confirmBox: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  confirmText: {
    color: "rgba(0,0,0,1)",
    fontSize: 24,
    fontFamily: "Prompt-Light"
  }
});
