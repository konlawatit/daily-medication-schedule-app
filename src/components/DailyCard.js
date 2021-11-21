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
  Pressable,
  Alert,
  Modal,
  TouchableOpacity
} from "react-native";
import { useDispatch } from "react-redux";
import { selectMedicine } from "../store/actions/medicineAction";

import { updateVerify } from "../database/database-function";
import { globalStyle } from "../stylesheet/globalStylesheet";
import { Ionicons, EvilIcons, Entypo, AntDesign } from "@expo/vector-icons";

export default function DailyCard(props) {
  const [modalVisible, setModalVisible] = useState(false);
  //   let image2 = require("../../assets/" + props.image)
  let title = props.title;
  let subTitle = props.subTitle;
  const [verify, setVerify] = useState(props.verify == 1 ? true : false);
  const [modalVisible, setModalVisible] = useState(props.verify == 1 ? true : false);
  let checkBox = props.checkBox ? props.checkBox : false;
  let id = props.id;
  let idMed = props.idMed
  let image = props.image;
  const navigation = props.navigation;

  const dispatch = useDispatch();


  const toggleVerify = () => {
    updateVerify(!verify, id,dispatch,idMed);
    setVerify(!verify);
    setModalVisible(!modalVisible)
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        dispatch(selectMedicine(idMed));
        navigation.navigate("DrugInfo", { idMed });
      }}
    >
      <View style={{ flex: 0.7 }}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: 150 }}
          />
        ) : (
          <Image
            style={{ width: "100%", height: 150 }}
            source={require("../../assets/test.jpg")}
          />
        )}
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
              onPress={()=>setModalVisible(true)}
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={globalStyle.centeredView}>
          <View style={globalStyle.modalView}>
            <TouchableOpacity
              style={{ marginLeft: "91%" }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <EvilIcons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={globalStyle.modalText}>
              คุณแน่ใจหรือไม่ว่าได้รับประทาน?
            </Text>
            <Text style={globalStyle.modalText}>
              "{subTitle}" เมื่อเวลา {title} น.
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[globalStyle.button, globalStyle.buttonCancel]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={[globalStyle.textStyle]}>ยกเลิก</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[globalStyle.button, globalStyle.buttonClose]}
                onPress={toggleVerify}
              >
                <Text style={[globalStyle.textStyle]}>ตกลง</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    opacity: 0.25,
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
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginBottom: 0,
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
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginBottom: 10,
  },
  circle: {
    borderColor: "green",
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
