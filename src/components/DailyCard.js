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
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { selectMedicine } from "../store/actions/medicineAction";
import { Feather } from '@expo/vector-icons';

import { updateVerify } from "../database/database-function";
import { date } from "yup/lib/locale";
import { globalStyle } from "../stylesheet/globalStylesheet";

export default function DailyCard(props) {
  const shadowStyle = {
    width: 100,
    height: 100,
    color: "#000",
    border: 2,
    radius: 3,
    opacity: 0.2,
    x: 0,
    y: 3,
    style: { marginVertical: 5 },
  };
  const [modalVisible, setModalVisible] = useState(false);
  //   let image2 = require("../../assets/" + props.image)
  let title = props.title;
  let subTitle = props.subTitle;
  const [verify, setVerify] = useState(props.verify == 1 ? true : false);
  let checkBox = props.checkBox ? props.checkBox : false;
  let id = props.id;
  let idMed = props.idMed;
  let image = props.image;
  const navigation = props.navigation;
  let date = new Date();
  let checkdate =
    (date.getHours() < 10 ? "0" : "") +
    date.getHours().toString() +
    ":" +
    (date.getMinutes() < 10 ? "0" : "") +
    date.getMinutes().toString();

  const dispatch = useDispatch();


  const toggleVerify = () => {
    updateVerify(!verify, id, dispatch, idMed);
    setVerify(!verify);
    setModalVisible(!modalVisible);
  };

  return (
    <TouchableOpacity
      style={title <= checkdate ? styles.card2 : styles.card}
      onPress={() => {
        // upLocalToFirebase()
        dispatch(selectMedicine(idMed));
        navigation.navigate("DrugInfo", { id:idMed });
      }}
    >
      <View style={{ flex: 0.7 }}>
        <Image source={{ uri: image }} style={{ width: "100%", height: 150 }} />
      </View>
      <View style={{ flex: 1, padding: 15 }}>

          {title <= checkdate ? (
            <Text
              style={[globalStyle.textThai, { color: "red", fontSize: 15 }]}
            >
              เลยเวลาทานมาแล้ว
            </Text>
          ) : (
            <Text
              style={[globalStyle.textThai, { color: "green", fontSize: 15 }]}
            >
              จะถึงเวลาทาน
            </Text>
          )}



          
          
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 45, fontFamily: "Prompt-Light" }}>
            {title} น.
          </Text>
        </View>

        <View style={styles.line}></View>

        <Text style={{ fontSize: 30, fontFamily: "Prompt-Light" }}>
          {subTitle}
        </Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{alignItems:"flex-end"}}>
          <Feather name="check-circle" size={28} color="black" />
        </TouchableOpacity>

      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>คุณแน่ใจหรือไม่ว่าได้รับประทาน</Text>
            <Text style={styles.modalText}>"{subTitle}" เมื่อเวลา {title} น.</Text>
            <View style={{flexDirection:'row'}}>
            <Pressable
              style={[styles.button, styles.buttonCancel]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <View style={{flex:0.2}}></View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={toggleVerify}>
              <Text style={styles.textStyle}>Confirm</Text>
            </Pressable>

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
    borderColor: "red",
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
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
    flex:1
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonCancel: {
    backgroundColor: '#eb3148',
  },
  textStyle: {
    color: 'white',
    fontFamily: "Prompt-Light",
    fontWeight: 'bold',
    textAlign: 'center',
  },  modalText: {
    marginBottom: 15,
    fontSize:18,
    fontFamily: "Prompt-Light",
    textAlign: 'center',
  },
});
