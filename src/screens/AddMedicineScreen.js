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
  Dimensions,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import { globalStyle } from "../stylesheet/globalStylesheet";

import { Asset, useAssets } from "expo-asset";

//Components
import NotificationCard from "../components/NotificationCard";

import * as MediaLibrary from "expo-media-library";

import { addMedicine } from "../database/database-function";
import { clearStackTime } from "../store/actions/medicineAction";

import { Ionicons, EvilIcons, Entypo, AntDesign } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

export default function AddMedicineScreen({ navigation }) {
  // console.disableYellowBox = true;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const timeList = useSelector((state) => state.medicine.stackTime);

  const [confirmName, setConfirmName] = useState();
  const [confirmNote, setConfirmNote] = useState();
  const [confirmDescription, setConfirmDescription] = useState();
  const [isSave, setIsSave] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const [stackDelTime, setStackDelTime] = useState([])

  const [check, setCheck] = useState(false);

  let dispatch = useDispatch();
 

  const save = (name, note, description, image) => {
    if (name) {
      addMedicine(name, note, description, timeList, image, dispatch);
      dispatch(clearStackTime());
      navigation.navigate("Medicine");
    } else {
      console.log("You need to input name first");
    }
  };

  const cancel = () => {
    navigation.goBack();
    dispatch(clearStackTime());
  };

  const confirm = () => {
    setCheck(!check);
    let payload = {};
  };


  const renderItem = (itemData) => {
    // console.log("----> check", itemData);
    return (
      <View style={{ alignItems: "center" }}>
        <NotificationCard
        navigation={false}
          time={itemData.item.time}
          day={itemData.item.day}
          id={itemData.item.id}
          isNoti={itemData.item.isNoti}

        />
      </View>
    );
  };

  const ContentThatGoesAboveTheFlatList = (save) => {
    const [name, setName] = useState();
    const [note, setNote] = useState();
    const [description, setDescription] = useState();
    const [pickedImagePath, setPickedImagePath] = useState("");
    const [renderImg] = useAssets([
      require("../../assets/sample/1.jpg"),
      require("../../assets/sample/2.jpeg"),
      require("../../assets/sample/3.jpg"),
      require("../../assets/sample/4.png"),
      require("../../assets/sample/5.jpeg"),
      require("../../assets/sample/6.jpeg"),
      require("../../assets/sample/7.jpg"),
      require("../../assets/sample/8.jpg"),
      require("../../assets/sample/9.jpg")
    ]);

    useEffect(() => {
      let payload = {
        name,
        note,
        description,
      };

      save(name, note, description, pickedImagePath);

      console.log(note);
    }, [check]);

    // The path of the picked image

    // This function is triggered when the "Select an image" button pressed

    const showImagePicker = async () => {
      // Ask the user for the permission to access the media library
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your photos!");
        return;
      }
      setImageModal(false);
      const result = await ImagePicker.launchImageLibraryAsync();

      // Explore the result
      console.log(result);

      if (!result.cancelled) {
        setPickedImagePath(result.uri);
        console.log(result.uri);
      }
    };

    // This function is triggered when the "Open camera" button pressed
    const openCamera = async () => {
      // Ask the user for the permission to access the camera
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your camera!");
        return;
      }
      setImageModal(false);
      const result = await ImagePicker.launchCameraAsync();

      // Explore the result
      console.log(result);

      if (!result.cancelled) {
        setPickedImagePath(result.uri);
        console.log(result.uri);
      }
    };

    const selectSample = async (img) => {
      setPickedImagePath(img.localUri)
      console.log(img.localUri);
      setImageModal(!imageModal)
    };

    return (
      <View style={[globalStyle.Addcontainer, { marginTop: 10 }]}>
        <LinearGradient
          // Background Linear Gradient
          colors={["rgba(255,255,255,1)", "transparent"]}
          style={globalStyle.background}
        />

        <TouchableOpacity
          style={{ width: 150, justifyContent: "flex-end" }}
          onPress={() => setImageModal(true)}
        >
          <View style={globalStyle.imageBox}>
            {pickedImagePath !== "" ? (
              <Image source={{ uri: pickedImagePath }} style={styles.image} />
            ) : (
              <Image
                source={require("../../assets/test.jpg")}
                style={styles.image}
              />
            )}
          </View>
          <Image
            style={globalStyle.addButton}
            source={require("../../assets/add.png")}
          />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={imageModal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setImageModal(!imageModal);
          }}
        >
          <View style={[globalStyle.centeredView, { height: "10%" }]}>
            <View style={[globalStyle.modalView]}>
              <TouchableOpacity
                style={{ marginLeft: 280 }}
                onPress={() => setImageModal(!imageModal)}
              >
                <EvilIcons name="close" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={showImagePicker}
                style={{ marginBottom: 15 }}
              >
                <Text style={styles.modalText}>เลือกรูปภาพ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={openCamera}
                style={{ marginBottom: 15 }}
              >
                <Text style={styles.modalText}>ถ่ายจากกล้อง</Text>
              </TouchableOpacity>
              <Text style={[styles.modalText, { marginBottom: 15 }]}>
                เลือกจากรูปภาพตัวอย่าง
              </Text>
              <View
                style={[globalStyle.line, { width: 300, marginBottom: 15 }]}
              ></View>
              <FlatList
                numColumns={3}
                data={renderImg}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => selectSample(item)}>
                    <Image
                      source={item}
                      key={index}
                      style={{
                        width: 90,
                        height: 90,
                        margin: 2,
                      }}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={confirmModal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setConfirmModal(!confirmModal);
          }}
        >
          <View style={globalStyle.centeredView}>
            <View style={globalStyle.modalView}>
              <TouchableOpacity
                style={{ marginLeft: 280 }}
                onPress={() => setConfirmModal(!confirmModal)}
              >
                <EvilIcons name="close" size={24} color="black" />
              </TouchableOpacity>
              <Text style={globalStyle.modalText}>คุณแน่ใจนะ?</Text>
              <Text style={globalStyle.modalText}>
                ข้อมูลยาที่คุณกรอกจะหายไปทั้งหมด
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={[globalStyle.button, globalStyle.buttonCancel]}
                  onPress={() => setConfirmModal(!confirmModal)}
                >
                  <Text style={[globalStyle.textStyle]}>ยกเลิก</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[globalStyle.button, globalStyle.buttonClose]}
                  onPress={() => cancel()}
                >
                  <Text style={[globalStyle.textStyle]}>ตกลง</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={{ width: "80%", borderColor: "grey" }}>
            <Text style={globalStyle.textThai}>ชื่อตัวยา</Text>
            <TextInput
              placeholder={"กรอกชื่อตัวยา"}
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
                padding: 5,
              }}
              value={description}
              onChangeText={setDescription}
              numberOfLines={5}
              textAlignVertical={"top"}
              multiline
            />
          </View>
        </View>

        <View style={{ width: "90%", marginTop: 10, marginBottom: 0 }}>
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

        <SafeAreaView
          style={{ width: "100%", height: "100%", marginBottom: 50 }}
        >
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

      <View style={globalStyle.bottomTabs}>
        <TouchableOpacity
          style={[globalStyle.confirmBox]}
          onPress={() => setConfirmModal(true)}
        >
          <Entypo name="cross" size={20} color="black" />
          <Text style={globalStyle.confirmText}>ยกเลิก</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyle.confirmBox} onPress={() => confirm()}>
          <AntDesign name="check" size={20} color="black" />
          <Text style={globalStyle.confirmText}>บันทึก</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalView: {
    width: "80%",
    height: 220,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 1,
    elevation: 15,
  },
  bottomTabs: {
    flexDirection: "row",
    marginTop: 27,
    width: "50%",
    justifyContent: "center",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    // height: ,
    bottom: 0,
    borderTopWidth: 0.5,
    borderColor: "#DADADA",
    padding: 12,
    bottom: 0,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  modalText: {
    color: "rgba(0,0,0,1)",
    textAlign: "center",
    fontFamily: "Prompt-Light",
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
