import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  CheckBox,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { useDispatch } from "react-redux";
import { selectMedicine } from "../store/actions/medicineAction";

import { updateVerify } from "../database/database-function";

export default function DailyCard(props) {
  //   let image2 = require("../../assets/" + props.image)
  let title = props.title;
  let subTitle = props.subTitle;
  const [verify, setVerify] = useState(props.verify == 1 ? true : false);
  let checkBox = props.checkBox ? props.checkBox : false;
  let id = props.id;
  const navigation = props.navigation;

  const dispatch = useDispatch()

  const toggleVerify = () => {
    updateVerify(!verify, id)
    setVerify(!verify);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        dispatch(selectMedicine(id))
        navigation.navigate("DrugInfo", { id });
      }}
    >
      <View style={{ flex: 0.7 }}>
        <Image
          style={{ width: "100%", height: 150 }}
          source={require("../../assets/test.jpg")}
        />
      </View>
      <View style={{ flex: 1, padding: 15 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 50, fontFamily: "Prompt-Light" }}>
            {title}
          </Text>
          {/* <CheckBox style={{borderRadius: 20, transform: [{ scaleX: 2 }, { scaleY: 2 }] }} value={data} onValueChange={setData} /> */}
          {checkBox ? (
            <TouchableOpacity
              style={styles.circle}
              onPress={() => toggleVerify()}
            >
              {verify ? (
                <Image
                  style={{ width: "80%", height: "80%" }}
                  source={require("../../assets/checkmark.png")}
                />
              ) : (
                <View></View>
              )}
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
        </View>

        <View style={styles.line}></View>

        <Text style={{ fontSize: 30, fontFamily: "Prompt-Light" }}>
          {subTitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  line: {
    // marginTop: 8,
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "grey",
    // backgroundColor:'grey',
    opacity: 0.25
  },
  card: {
    width: "90%",
    borderWidth: 2,
    borderColor: "green",
    flexDirection: "row",
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#ffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginBottom: 0
  },
  card2: {
    width: "90%",
    borderWidth: 2,
    borderColor: "grey",
    flexDirection: "row",
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#ffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginBottom: 10
  },
  circle: {
    borderColor: "green",
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
