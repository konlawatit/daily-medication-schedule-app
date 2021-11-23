import React, { useContext, useEffect, useState } from "react";
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
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
//Components
import NotificationCard from "../components/NotificationCard";

//gloabalStylesheet
import { globalStyle } from "../stylesheet/globalStylesheet";

//sqlite
import { DatabaseConnection } from "../database/database-connection";
const db = DatabaseConnection.getConnection();
import {
  updateMedicine,
  deleteTime,
  deleteMedicine,
} from "../database/database-function";

//state
import {
  stackTime,
  stackDeleteTime,
  updateTimeInTime,
  setTime,
} from "../store/actions/medicineAction";

import { Ionicons, EvilIcons, Entypo, AntDesign } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

import { Asset, useAssets } from "expo-asset";

export default function DrugInfoScreen({ navigation, route }) {
  // console.disableYellowBox = true;
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const medicineInfo = useSelector((state) => state.medicine.selectMedicine);
  const [id, setId] = useState(route.params.id);
  const [confirmModal, setConfirmModal] = useState(false);

  let selectTimeList = useSelector((state) => {
    const time = state.medicine.time;
    return time.filter((data) => data.MEDICINE_id == id);
  });

  const [uniqueValue, setUniqueValue] = useState(1);
  let forceRemount = () => {
    setUniqueValue((data) => data + 1);
  };

  // let selectTimeList = useSelector((state) => state.medicine.time);

  const [testTime, setTestTime] = useState();
  // console.log('select time list medicitn', selectTimeList)

  useEffect(() => {
    console.log("helo worlddddddddddddddddddddddddddddddddddd");
    // db.transaction((tx) => {
    //   tx.executeSql(
    //     `SELECT *
    //     FROM MEDICINE
    //     INNER JOIN TIME
    //     ON MEDICINE.id = TIME.MEDICINE_id`,
    //     [],
    //     (tx, results) => {
    //       let result = results.rows._array;
    //       let newArray = result.map((data) => {
    //         return {
    //           ...data,
    //           day: JSON.parse(data.day),
    //           isNoti: data.isNoti === 1 ? true : false
    //         };
    //       });

    //       // dispatch(setTime(newArray))
    //       console.log('>>>>>>>>>>>>>>>>>>>>>>>>')
    //       // console.log("select time updateeeeeeeeee22222222222222222222222222222", results.rows._array);
    //       dispatch(setTime(newArray));
    //       setTestTime(newArray)

    //     },
    //     (_, err) => {
    //       console.log("insert time error", err);

    //       return true;
    //     }
    //   );
    // });
  }, []);

  const [isEdit, setIsEdit] = useState(false);
  const [isConfirmEdit, setIsConfirmEdit] = useState(false);
  const [isCancleEdit, setIsCancleEdit] = useState(false);
  const [renderImg] = useAssets([
    require("../../assets/sample/1.jpg"),
    require("../../assets/sample/2.jpeg"),
    require("../../assets/sample/3.jpg"),
    require("../../assets/sample/4.png"),
  ]);

  let delNoti = useSelector((state) => state.medicine.stackDeleteTime);

  const confirmEdit = (name, note, description, image) => {
    const payload = {
      name,
      note,
      description,
      image,
      id,
    };
    console.log(image);
    if (delNoti.length == 0 && !(delNoti.length == selectTimeList.length)) {
      deleteTime(selectTimeList, dispatch);
      selectTimeList = [];
    } else {
      let payload2 = [];
      selectTimeList.forEach((data) => {
        if (delNoti.indexOf(data) < 0) {
          payload2.push(data);
        }
      });
      deleteTime(payload2, dispatch);
    }
    updateMedicine(payload, dispatch);
    setTimeout(function () {
      setIsEdit(false);
      setIsConfirmEdit(false);
    }, 200);
  };

  const delMedicine = () => {
    deleteMedicine(id, dispatch);
    navigation.navigate("Medicine");
  };

  const cancleEdit = (setName, setNote, setDescription, setImage) => {
    setName(medicineInfo.name);
    setNote(medicineInfo.note);
    setDescription(medicineInfo.description);
    setImage(medicineInfo.image);
    setIsCancleEdit(false);
  };

  useEffect(() => {}, []);

  const ContentThatGoesAboveTheFlatList = (confirmEdit) => {
    let selectTimeList2 = useSelector((state) => {
      const time = state.medicine.time;
      return time.filter((data) => data.MEDICINE_id == id);
    });

    const [name, setName] = useState(medicineInfo.name);
    const [note, setNote] = useState(medicineInfo.note);
    const [description, setDescription] = useState(medicineInfo.description);
    const [image, setImage] = useState(medicineInfo.image);
    const [imageModal, setImageModal] = useState(false);

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

      if (!result.cancelled) {
        setImage(result.uri);
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
        setImage(result.uri);
      }
    };

    const selectSample = async (img) => {
      setImage(img.localUri);
      setImageModal(!imageModal);
    };

    const renderItem = (itemData) => {
      return (
        <View style={{ alignItems: "center" }}>
          <NotificationCard
            navigation={navigation}
            time={itemData.item.time}
            day={itemData.item.day}
            isEdit={isEdit}
            isNoti={itemData.item.isNoti}
            id={itemData.item.id}
          />
        </View>
      );
    };

    // console.log(selectTimeList)

    useEffect(() => {
      if (isConfirmEdit === true) {
        confirmEdit(name, note, description, image);
      }

      if (isCancleEdit === true) {
        cancleEdit(setName, setNote, setDescription, setImage);
      }
    }, [isConfirmEdit, isCancleEdit]);

    return (
      <SafeAreaView style={[globalStyle.Addcontainer]}>
        <LinearGradient
          // Background Linear Gradient
          colors={["rgba(255,255,255,1)", "transparent"]}
          style={globalStyle.background}
        />

        <View style={styles.infoContain}>
          {/* <EvilIcons
            style={{
              position: "absolute",
              alignSelf: "flex-end",
              zIndex: 100
            }}
            name="pencil"
            size={54}
            color="black"
            onPress={() => navigation.navigate("EditDrugInfo", { id })}
          /> */}
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
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ flex: 0.7 }}>
              {isEdit ? (
                <TouchableOpacity onPress={() => setImageModal(true)}>
                  <Image
                    style={{ width: "90%", height: "90%" }}
                    source={{ uri: image }}
                  />
                </TouchableOpacity>
              ) : (
                <Image
                  style={{ width: "90%", height: "90%" }}
                  source={{ uri: medicineInfo.image }}
                />
              )}
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
                style={{
                  flexDirection: "row",
                  height: 50,
                  alignItems: "flex-end",
                  marginTop: 10,
                }}
              >
                {isEdit ? (
                  <TextInput
                    style={{
                      fontFamily: "Prompt-Light",
                      fontSize: 30,
                      width: "100%",
                    }}
                    value={name}
                    onChangeText={setName}
                  />
                ) : (
                  <Text style={{ fontFamily: "Prompt-Light", fontSize: 30 }}>
                    {medicineInfo.name}
                  </Text>
                )}
              </View>
              <View style={globalStyle.line}></View>

              {isEdit ? (
                <TextInput
                  placeholder="หมายเหตุ"
                  style={{
                    fontFamily: "Prompt-Light",
                    fontSize: 18,
                    width: "100%",
                    height: 65,
                  }}
                  value={note}
                  onChangeText={setNote}
                  multiline
                />
              ) : (
                <ScrollView style={{ height: 65 }}>
                  <Text
                    style={{
                      fontFamily: "Prompt-Light",
                      fontSize: 18,
                    }}
                  >
                    {medicineInfo.note}
                  </Text>
                </ScrollView>
              )}
            </View>
          </View>

          <View
            style={{
              width: "100%",
              height: "100%",
              borderColor: "grey",
              flex: 1,
            }}
          >
            <Text style={[globalStyle.textThai, { fontSize: 18 }]}>
              คำอธิบายตัวยา
            </Text>
            {isEdit ? (
              <TextInput
                placeholder="กรอกคำอธิบายตัวยา"
                style={{
                  fontFamily: "Prompt-Light",
                  fontSize: 18,
                  width: "100%",
                }}
                value={description}
                onChangeText={setDescription}
                multiline
              />
            ) : (
              <ScrollView>
                <Text style={{ fontFamily: "Prompt-Light", fontSize: 18 }}>
                  {medicineInfo.description}
                </Text>
              </ScrollView>
            )}
          </View>
        </View>
        <View style={{ width: "90%", marginTop: 10 }}>
          <View style={globalStyle.SectionStyle}>
            <Text style={{ fontFamily: "Prompt-Light", fontSize: 16 }}>
              เวลาที่จะต้องทาน
            </Text>
            {isEdit ? (
              <></>
            ) : (
              <TouchableOpacity
                style={{ marginLeft: "58%" }}
                onPress={() =>
                  navigation.navigate("NotificationTime", {
                    id: medicineInfo.id,
                  })
                }
              >
                <Image
                  source={require("../../assets/add.png")} //Change your icon image here
                  style={globalStyle.ImageStyle}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={globalStyle.showLine}></View>
        </View>

        <FlatList
          data={isEdit ? delNoti : selectTimeList}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={renderItem}
          style={{ flex: 1, width: "100%", marginBottom: 50 }}
          // extraData={selectTimeList}
        />
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        keyExtractor={(item, index) => id.toString()}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        data={[]}
        ListHeaderComponent={ContentThatGoesAboveTheFlatList(
          confirmEdit,
          cancleEdit
        )}
        // ListFooterComponent={ContentThatGoesBelowTheFlatList}
      />

      <View style={styles.section3}>
        {isEdit ? (
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
              onPress={() => {
                setIsConfirmEdit(!isConfirmEdit);
              }}
            >
              <Text style={styles.confirmText}>ยืนยันการแก้ไข</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={globalStyle.bottomTabs}>
            <TouchableOpacity
              style={globalStyle.confirmBox}
              onPress={() => {
                dispatch(stackDeleteTime(id));
                console.log(delNoti);
                setIsEdit(!isEdit);

              }}
            >
              <AntDesign name="edit" size={30} color="#fcb603" />
              <Text style={[globalStyle.confirmText,{color:"#fcb603"}]}>แก้ไข</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmBox}
              onPress={() => {
                setConfirmModal(true)
                // navigation.navigate("Medicine");
              }}
            >
              <AntDesign name="delete" size={30} color="red" />
              <Text style={[globalStyle.confirmText,{color:"red"}]}>ลบ</Text>
            </TouchableOpacity>
          </View>
          // <View
          //   style={{
          //     flexDirection: "row",
          //     width: "100%",
          //     height: 60,
          //     backgroundColor: "rgba(255,255,255,1)",
          //   }}
          // >
    
          // </View>
        )}
      </View>
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
                onPress={() => delMedicine()}
              >
                <Text style={[globalStyle.textStyle]}>ตกลง</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginTop: 20,
  },
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
});
