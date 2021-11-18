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
  FlatList
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { EvilIcons } from "@expo/vector-icons";
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
  deleteMedicine
} from "../database/database-function";

//state
import {
  stackTime,
  stackDeleteTime,
  updateTimeInTime,
  setTime
} from "../store/actions/medicineAction";

export default function DrugInfoScreen({ navigation, route }) {
  // console.disableYellowBox = true;
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const medicineInfo = useSelector((state) => state.medicine.selectMedicine);
  const [id, setId] = useState(route.params.id);

  let selectTimeList = useSelector((state) => {
    const time = state.medicine.time;
    return time.filter((data) => data.MEDICINE_id == id);
  });

  const [uniqueValue, setUniqueValue] = useState(1)
  let forceRemount = () => {
    setUniqueValue(data => data+1)
  }
  
  
  
  // let selectTimeList = useSelector((state) => state.medicine.time);
  
  
  const [testTime, setTestTime] = useState()
  console.log('2342333333333333333', selectTimeList)
  
  useEffect(() => {
    console.log('helo worlddddddddddddddddddddddddddddddddddd')
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
    }, [])

  
  

  // const st = useSelector(state => state.medicine.stackTime)

  const [isEdit, setIsEdit] = useState(false);
  const [isConfirmEdit, setIsConfirmEdit] = useState(false);
  const [isCancleEdit, setIsCancleEdit] = useState(false);

  let delNoti = useSelector((state) => state.medicine.stackDeleteTime);

  const confirmEdit = (name, note, description, image) => {
    const payload = {
      name,
      note,
      description,
      image,
      id
    };
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
        <Button title="test" onPress={() => {
            console.log('---------------------------------------------------')
          console.log(selectTimeList)
          forceRemount();
          console.log(uniqueValue)
          console.log('---------------------------------------------------')
        }} />

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
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ flex: 0.7 }}>
              {medicineInfo.image ? (
                <Image
                  style={{ width: "90%", height: "90%" }}
                  source={{ uri: medicineInfo.image }}
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
                {isEdit ? (
                  <TextInput
                    style={{
                      fontFamily: "Prompt-Light",
                      fontSize: 30,
                      width: "100%"
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
                    height: 65
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
                      fontSize: 18
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
              flex: 1
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
                  width: "100%"
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
                    id: medicineInfo.id
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
              backgroundColor: "rgba(255,255,255,1)"
            }}
          >
            <TouchableOpacity
              style={styles.confirmBox}
              onPress={() => {
                setIsEdit(!isEdit);
                // navigation.navigate("EditDrugInfo", { id });
              }}
            >
              <Text style={styles.confirmText}>ยกเลิก</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmBox}
              onPress={() => {
                setIsConfirmEdit(!isConfirmEdit);
              }}
            >
              <Text style={styles.confirmText}>ยืนยัน</Text>
            </TouchableOpacity>
          </View>
        ) : (
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
              onPress={() => {
                dispatch(stackDeleteTime(id));
                console.log(delNoti);
                setIsEdit(!isEdit);

                // navigation.navigate("EditDrugInfo", { id });
              }}
            >
              <Text style={styles.confirmText}>แก้ไข</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmBox}
              onPress={() => {
                delMedicine();
                navigation.navigate("Medicine");
              }}
            >
              <Text style={styles.confirmText}>ลบ</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
  },
  section3: {
    flex: 1,
    width: "100%",
    position: "absolute",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    // height: ,
    bottom: 0
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
