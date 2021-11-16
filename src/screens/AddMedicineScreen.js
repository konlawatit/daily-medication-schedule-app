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
<<<<<<< Updated upstream
  Linking
=======
  Linking,
  Dimensions,
  Alert,
  Modal,
  Pressable,
>>>>>>> Stashed changes
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { globalStyle } from "../stylesheet/globalStylesheet";

//Components
import NotificationCard from "../components/NotificationCard";

<<<<<<< Updated upstream
=======
import { addMedicine } from "../database/database-function";

import { EvilIcons } from '@expo/vector-icons'; 

import * as ImagePicker from "expo-image-picker";

>>>>>>> Stashed changes
export default function AddMedicineScreen({ navigation }) {
  // console.disableYellowBox = true;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
<<<<<<< Updated upstream
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
=======
  const timeList = useSelector((state) => state.medicine.stackTime);

  const [confirmName, setConfirmName] = useState();
  const [confirmNote, setConfirmNote] = useState();
  const [confirmDescription, setConfirmDescription] = useState();
  const [isSave, setIsSave] = useState(false);

  const [check, setCheck] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  let dispatch = useDispatch();
  const save = (name, note, description) => {
    if (name) {
      addMedicine(name, note, description, timeList, dispatch);
    }
    console.log(name, note, description);
  };

  const confirm = () => {
    setCheck(!check);
    let payload = {};
  };
>>>>>>> Stashed changes

  const renderItem = (itemData) => {
    return (
      <View style={{ alignItems: "center" }}>
        {/* <NotificationCard /> */}
      </View>
    );
  };

<<<<<<< Updated upstream
  const ContentThatGoesAboveTheFlatList = () => {
=======
  const ContentThatGoesAboveTheFlatList = (save) => {
    const [name, setName] = useState();
    const [note, setNote] = useState();
    const [description, setDescription] = useState();

    // The path of the picked image
    const [pickedImagePath, setPickedImagePath] = useState("");

    // This function is triggered when the "Select an image" button pressed
    const showImagePicker = async () => {
      // Ask the user for the permission to access the media library
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your photos!");
        return;
      }
      setModalVisible(false)
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
      setModalVisible(false)
      const result = await ImagePicker.launchCameraAsync();

      // Explore the result
      console.log(result);

      if (!result.cancelled) {
        setPickedImagePath(result.uri);
        console.log(result.uri);
      }
    };

>>>>>>> Stashed changes
    return (
        <View style={globalStyle.Addcontainer}>
        <LinearGradient
          // Background Linear Gradient
          colors={["rgba(255,255,255,1)", "transparent"]}
          style={globalStyle.background}
        />

        <TouchableOpacity
          style={{ width: 150, justifyContent: "flex-end" }}
          onPress={() => setModalVisible(true)}
        >
          <View style={globalStyle.imageBox}>
            {pickedImagePath !== "" && (
              <Image source={{ uri: pickedImagePath }} style={styles.image} />
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
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView]}>
              <TouchableOpacity
                style={{ marginLeft: "91%" }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <EvilIcons name="close" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={showImagePicker}>
                <Text style={styles.modalText}>เลือกรูปภาพ</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={openCamera}>
                <Text style={styles.modalText}>ถ่ายจากกล้อง</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
            <Text style={{ fontFamily: "Prompt-Light", fontSize: 16 }}>
              เวลาที่จะต้องทาน
            </Text>
            <TouchableOpacity style={{ marginLeft: "58%" }}>
              <Image
                source={require("../../assets/add.png")} //Change your icon image here
                style={globalStyle.ImageStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={globalStyle.showLine}></View>
        </View>
        <SafeAreaView style={{ flex: 1, width: "100%" }}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            style={{ width: "100%" }}
          />
        </SafeAreaView>
      </View>
<<<<<<< Updated upstream
    )
  }
=======
    );
  };
>>>>>>> Stashed changes

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={[]}
        ListHeaderComponent={ContentThatGoesAboveTheFlatList}
        // ListFooterComponent={ContentThatGoesBelowTheFlatList}
      />
<<<<<<< Updated upstream
    </SafeAreaView>
  );
}
=======

      <View style={styles.section3}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            height: 60,
            backgroundColor: "rgba(255,255,255,1)",
          }}
        >
          <TouchableOpacity
            style={styles.confirmBox}
            onPress={() => navigation.goBack()}
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
    alignItems: "center",
  },
  confirmText: {
    color: "rgba(0,0,0,1)",
    fontSize: 24,
    fontFamily: "Prompt-Light",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    width: 400,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalView: {
    width: "80%",
    height: "50%",
    margin: 20,
    backgroundColor: "white",
    padding: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Prompt-Light",
  },
  modalText: {
    marginBottom: 28,
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
>>>>>>> Stashed changes
