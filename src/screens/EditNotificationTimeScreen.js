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
import { useSelector } from "react-redux";
import { EvilIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import DropDown from "react-native-dropdown-picker";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import { useDispatch } from "react-redux";

//Components
import SetNotiCard from "../components/SetNotiCard";

import { stackTime, updateTimeInTime, selectMedicine, clearTime } from "../store/actions/medicineAction";

import { updateTime } from "../database/database-function";

export default function EditNotificationTimeScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const selectTime = useSelector((state) => state.medicine.selectTime);
  
  const [hour, setHour] = useState();
  const [min, setMin] = useState();
  const [hourArr, setHourArr] = useState(["00","01", "02", "03", "04", "05", "06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"])
  const [minArr, setMinArr] = useState(["00","01", "02", "03", "04", "05", "06", "07", "08", "09", "10","11", "12", "13", "14", "15", "16", "17", "18", "19", "20","21", "22", "23", "24", "25", "26", "27", "28", "29", "30","31","32","33","34","35","36","37","38","39","40","41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"])
  const [hourIndex, setHourIndex] = useState(hourArr.indexOf(selectTime.time.split(":")[0]));
  const [minIndex, setMinIndex] = useState(minArr.indexOf(selectTime.time.split(":")[1]));
  const [id, setId] = useState(route.params.id)


  // const [day, setDay] = useState({
  //   fr: 1,
  //   mo: 1,
  //   sa: 1,
  //   su: 1,
  //   th: 1,
  //   tu: 1,
  //   we: 1
  // });
  const [day, setDay] = useState(selectTime.day)

  const [options, setOptions] = useState([
    { id: 1, title: "เสียงการแจ้งเตือน", subTitle: "Homecoming", value: false },
    { id: 2, title: "ระบบสั่น", subTitle: "Homecoming", value: false },
    { id: 3, title: "ข้าม", subTitle: "5 นาที", value: false },
    { id: 4, title: "แจ้งเตือนซ้ำ", value: false }
  ]);

  function confirm() {
    // let payload = {
      // time: hourArr[hourIndex]+":"+minArr[minIndex],
    //   id: selectTime.MEDICINE_id,
    //   day
    //   // options
    // };

    let payload = {
      time: hourArr[hourIndex]+":"+minArr[minIndex],
      status: false,
      isNoti: true,
      day
      // options
    };

    updateTime({...payload, id: selectTime.MEDICINE_id, timeId: id}, dispatch)
    navigation.navigate('DrugInfo', {id: selectTime.MEDICINE_id})

    // updateTime(payload, dispatch)
    // clearTime(id)
    // navigation.goBack();
    // dispatch(selectMedicine(selectTime.MEDICINE_id));
    // dispatch(updateTimeInTime(id, payload.time, payload.day))
    // navigation.navigate("DrugInfo", { id: selectTime.MEDICINE_id });
  }

  const renderItem = (itemData) => {
    return (
      <SetNotiCard
        id={itemData.item.id}
        title={itemData.item.title}
        subTitle={itemData.item.subTitle ? itemData.item.subTitle : false}
        options={options}
        setOptions={setOptions}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.section1}>
        <View style={[styles.time]}>
          <ScrollPicker
            wrapperColor="rgba(255,255,255,0)"
            dataSource={hourArr}
            selectedIndex={hourIndex}
            style={{ backgroundColor: "black" }}
            renderItem={(data, index) => {
              return (
                <View>
                  <Text
                    style={[
                      styles.timeChar,
                      {
                        color:
                          index == hourIndex ? "white" : "rgba(255,255,255,0.5)"
                      }
                    ]}
                  >
                    {data}
                  </Text>
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
          <View style={{ flex: 0, paddingBottom: 10 }}>
            <Text style={styles.timeChar}>:</Text>
          </View>
          <ScrollPicker
            wrapperColor="rgba(255,255,255,0)"
            dataSource={minArr}
            selectedIndex={minIndex}
            style={{ backgroundColor: "black" }}
            renderItem={(data, index) => {
              return (
                <View>
                  <Text
                    style={[
                      styles.timeChar,
                      {
                        color:
                          index == minIndex ? "white" : "rgba(255,255,255,0.5)"
                      }
                    ]}
                  >
                    {data}
                  </Text>
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
        </View>
        <View style={styles.dayOfWeek}>
          <TouchableOpacity onPress={() => setDay({ ...day, mo: !day.mo })}>
            <Text
              style={[
                styles.dayChar,
                {
                  color: day.mo
                    ? "rgba(255,255,255,1)"
                    : "rgba(255,255,255,0.5)"
                }
              ]}
            >
              จ.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDay({ ...day, tu: !day.tu })}>
            <Text
              style={[
                styles.dayChar,
                {
                  color: day.tu
                    ? "rgba(255,255,255,1)"
                    : "rgba(255,255,255,0.5)"
                }
              ]}
            >
              อ.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDay({ ...day, we: !day.we })}>
            <Text
              style={[
                styles.dayChar,
                {
                  color: day.we
                    ? "rgba(255,255,255,1)"
                    : "rgba(255,255,255,0.5)"
                }
              ]}
            >
              พ.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDay({ ...day, th: !day.th })}>
            <Text
              style={[
                styles.dayChar,
                {
                  color: day.th
                    ? "rgba(255,255,255,1)"
                    : "rgba(255,255,255,0.5)"
                }
              ]}
            >
              พฤ.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDay({ ...day, fr: !day.fr })}>
            <Text
              style={[
                styles.dayChar,
                {
                  color: day.fr
                    ? "rgba(255,255,255,1)"
                    : "rgba(255,255,255,0.5)"
                }
              ]}
            >
              ศ.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDay({ ...day, sa: !day.sa })}>
            <Text
              style={[
                styles.dayChar,
                {
                  color: day.sa
                    ? "rgba(255,255,255,1)"
                    : "rgba(255,255,255,0.5)"
                }
              ]}
            >
              ส.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDay({ ...day, su: !day.su })}>
            <Text
              style={[
                styles.dayChar,
                {
                  color: day.su
                    ? "rgba(255,255,255,1)"
                    : "rgba(255,255,255,0.5)"
                }
              ]}
            >
              อา.
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
      </View>
      <View style={styles.section2}>
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
            <TouchableOpacity onPress={() => confirm()}>
              <Text style={styles.confirmText}>บันทึก</Text>
            </TouchableOpacity>
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
    marginTop:200,
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
