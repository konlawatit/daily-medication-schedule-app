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
  FlatList
} from "react-native";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

//action
import { stackDeleteTime, reduceStackDeleteTime } from "../store/actions/medicineAction";
import { deleteNotificationCategoryAsync } from "expo-notifications";

//Components
export default function NotificationCard(props) {
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(true);
  const [time, setTime] = useState(props.time);
  const [day, setDay] = useState(props.day);
  const [id, setId] = useState(props.id)


  const toggleSwitch = () =>
    setIsEnabled(
      (previousState) => !previousState,
      console.log("" + isEnabled)
    );
  
    const delNoti = () => {
      dispatch(reduceStackDeleteTime(id))
    }

  const dayCheck = (d) => {
    return d == 1 ? "white" : "grey";
  };

  return (
    // <View style={[isEnabled ? styles.cardOn : styles.cardOff]} >

    <TouchableOpacity
      style={styles.cardOn}
      onPress={() => props.navigation.navigate("NotificationTime")}
    >
      {/* <AntDesign name="delete" size={24} color="red" /> */}
      <View style={styles.imagePart}>
        <Image
          style={{ width: "60%", height: "50%", marginTop: 10 }}
          source={require("../../assets/sun.png")}
        />
      </View>
      <View style={styles.infoPart}>
        <Text style={styles.time}>{time}</Text>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text style={[styles.daysOfweek, { color: dayCheck(day.mo) }]}>
            จ
          </Text>
          <Text style={[styles.daysOfweek, { color: dayCheck(day.tu) }]}>
            อ
          </Text>
          <Text style={[styles.daysOfweek, { color: dayCheck(day.we) }]}>
            พ
          </Text>
          <Text style={[styles.daysOfweek, { color: dayCheck(day.th) }]}>
            พฤ
          </Text>
          <Text style={[styles.daysOfweek, { color: dayCheck(day.fr) }]}>
            ศ
          </Text>
          <Text style={[styles.daysOfweek, { color: dayCheck(day.sa) }]}>
            ส
          </Text>
          <Text style={[styles.daysOfweek, { color: dayCheck(day.su) }]}>
            อา
          </Text>
        </View>
      </View>
      <View style={[styles.switchPart]}>
        {props.isEdit ? (
          <></>
        ) : (
          <Switch
            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
            trackColor={{ false: "#767577", true: "#04A438" }}
            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        )}
      </View>
      {props.isEdit ? (
        <TouchableOpacity
          style={{
            position: "absolute",
            alignSelf: "flex-start",
            right: -10,
            top: -10,
            zIndex: 101
          }}
          onPress={() => {
            delNoti()
          }}
        >
          <MaterialIcons name="cancel" size={30} color="red" />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </TouchableOpacity>
    // </View>
  );
}

const styles = StyleSheet.create({
  time: {
    fontFamily: "Prompt-Light",
    fontSize: 40,
    color: "white"
  },
  daysOfweek: {
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    // color: "white" ,
    fontFamily: "Prompt-Light"
  },
  cardOn: {
    flexDirection: "row",
    width: "90%",
    backgroundColor: "rgba(85,194,255,8)",
    height: 100,
    padding: 10,
    marginBottom: "5%",
    borderRadius: 10,
    // marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.39,
    shadowRadius: 100.3,
    elevation: 5,
    alignItems: "center"
  },
  cardOff: {
    flexDirection: "row",
    width: "90%",
    backgroundColor: "rgba(85,194,255,8)",
    height: 100,
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.39,
    shadowRadius: 100.3,
    elevation: 5,
    alignItems: "center",
    opacity: 0.5
  },
  imagePart: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%"
  },
  infoPart: {
    flex: 1,
    justifyContent: "flex-start"
  },
  switchPart: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  }
});
