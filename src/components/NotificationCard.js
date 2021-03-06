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
} from "react-native";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

//action
import {
  stackDeleteTime,
  reduceStackDeleteTime,
} from "../store/actions/medicineAction";
import { deleteNotificationCategoryAsync } from "expo-notifications";

//sqlite
import { updateIsNoti } from "../database/database-function";

//store
import { selectTime } from "../store/actions/medicineAction";

//Components
export default function NotificationCard(props) {
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(props.isNoti == 1 ? true : false);
  const [time, setTime] = useState(props.time);
  const [day, setDay] = useState(props.day);
  const [id, setId] = useState(props.id);
  // console.log('is noy',props.isNoti)

  const toggleSwitch = () => {
    setIsEnabled((previousState) => {
      updateIsNoti(!isEnabled, id, dispatch);
      return !previousState;
    });
  };

  const delNoti = () => {
    dispatch(reduceStackDeleteTime(id));
  };

  const dayCheck = (d) => {
    return d == 1 ? "white" : "grey";
  };

  const dayTimeCheck = (t) => {
    if(t<="18:00"&& t>="06:00"){
      console.log("00:00"<"06:00")
      return true
    }
    return false
  };

  return (
    // <View style={[isEnabled ? styles.cardOn : styles.cardOff]} >

    <TouchableOpacity
      style={[
        styles.cardOn,
        dayTimeCheck(time)
          ? { backgroundColor: "rgba(85,194,255,8)" }
          : { backgroundColor: "#616161" },
      ]}
      onPress={() => {
        if (props.navigation !== false) {
          props.navigation.navigate("EditNotificationTime", { id });
          dispatch(selectTime(id));
        }
      }}
    >
      {/* <AntDesign name="delete" size={24} color="red" /> */}
      <View style={styles.imagePart}>
        {dayTimeCheck(time) ? (
          <Image
            style={{ width: "60%", height: "50%", marginTop: 10 }}
            source={require("../../assets/sun.png")}
          />
        ) : (
          <Image
            style={{ width: "60%", height: "50%", marginTop: 10 }}
            source={require("../../assets/moon.png")}
          />
        )}
      </View>
      <View style={styles.infoPart}>
        <Text style={styles.time}>{time}</Text>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text style={[styles.daysOfweek, { color: dayCheck(day.mo) }]}>
            ???
          </Text>
          <Text style={[styles.daysOfweek, { color: dayCheck(day.tu) }]}>
            ???
          </Text>
          <Text style={[styles.daysOfweek, { color: dayCheck(day.we) }]}>
            ???
          </Text>
          <Text style={[styles.daysOfweek, { color: dayCheck(day.th) }]}>
            ??????
          </Text>
          <Text style={[styles.daysOfweek, { color: dayCheck(day.fr) }]}>
            ???
          </Text>
          <Text style={[styles.daysOfweek, { color: dayCheck(day.sa) }]}>
            ???
          </Text>
          <Text style={[styles.daysOfweek, { color: dayCheck(day.su) }]}>
            ??????
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
            zIndex: 101,
          }}
          onPress={() => {
            delNoti();
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
    color: "white",
  },
  daysOfweek: {
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    // color: "white" ,
    fontFamily: "Prompt-Light",
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
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 100.3,
    elevation: 5,
    alignItems: "center",
  },
  cardOff: {
    flexDirection: "row",
    width: "90%",
    backgroundColor: "#616161",
    height: 100,
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 100.3,
    elevation: 5,
    alignItems: "center",
    opacity: 0.5,
  },
  imagePart: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  infoPart: {
    flex: 1,
    justifyContent: "flex-start",
  },
  switchPart: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
});
