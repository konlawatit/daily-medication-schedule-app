import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
  LogBox
} from "react-native";
import { Ionicons, EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { globalStyle } from "../stylesheet/globalStylesheet";
import { useSelector, useDispatch } from "react-redux";
import NetInfo from "@react-native-community/netinfo";

import { upLocalToFirebase } from "../database/database-firestore";

import { signInWithGoogleAsync, logInFacebook, setData } from "../../firebase";
import { clearUser } from "../store/actions/userAction";
import { changeHistoryState, changeMedicineState, changeTimeState, delDB } from "../database/database-function";

LogBox.ignoreLogs(["Unhandled promise rejection: TypeError: Network request failed"]);

export default function HeaderTitle(props) {
  const navigation = props.navigation;
  const [confirmModal, setConfirmModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [netModal, setNetModal] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  return (
    <View style={styles.headerTitleContain}>
      <View style={styles.hiddenLine}></View>
      <View style={{ flexDirection: "row", width: "90%" }}>
        <View>
          <Text style={{ fontSize: 25, fontFamily: "Prompt-Light" }}>
            {props.title}
          </Text>
        </View>
        <TouchableOpacity
          style={{ position: "absolute", right: 10, top: -10 }}
          onPress={() => {
            const unsubscribe = NetInfo.addEventListener((state) => {
              console.log("Connection type", state.type);
              console.log("Is connected?", state.isConnected);
              if (state.isConnected) {
                if (user.email !== "") {
                  console.log(user);
                  setConfirmModal(true);
                } else {
                  setLoginModal(true);
                }
              } else {
                setNetModal(true);
              }
            });
          }}
        >
          {/* <Text style={{ fontSize: 25, fontFamily: "Prompt-Light" }}> */}
          <Ionicons
            name="ios-cloud-upload"
            size={25}
            color="rgba(0,0,0,1)"
            style={{ alignSelf: "center" }}
          />
          <Text>สำรองข้อมูล</Text>
          {/* </Text> */}
        </TouchableOpacity>
      </View>
      <View style={styles.showLine}></View>

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
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}>
              {user.provider === "google" ? (
                <Image
                  source={require("../../assets/google-logo.png")}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                />
              ) : (
                <Image
                  source={require("../../assets/facebook-logo.png")}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                />
              )}
              <Text style={[globalStyle.modalText, { marginTop: 15 }]}>
                {user.email}
              </Text>
              <TouchableOpacity onPress={() => {
              dispatch(clearUser())
              delDB()
              changeMedicineState(dispatch)
              changeHistoryState(dispatch)
              changeTimeState(dispatch)
              setConfirmModal(false)
              navigation.navigate("Login")
            }}>
              <MaterialIcons name="logout" style={{marginLeft: 10}} size={24} color="black" />
              </TouchableOpacity>
            </View>
            {/* <Text style={globalStyle.modalText}>คุณแน่ใจนะ?</Text> */}
            <Text style={globalStyle.modalText}>ต้องการสำรองข้อมูลหรือไม่</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[globalStyle.button, globalStyle.buttonCancel]}
                onPress={() => setConfirmModal(!confirmModal)}
              >
                <Text style={[globalStyle.textStyle]}>ยกเลิก</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[globalStyle.button, globalStyle.buttonClose]}
                onPress={() => {
                  //ok
                  upLocalToFirebase(user.uid);
                  setConfirmModal(!confirmModal)
                }}
              >
                <Text style={[globalStyle.textStyle]}>ตกลง</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={loginModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setLoginModal(!loginModal);
        }}
      >
        <View style={globalStyle.centeredView}>
          <View style={globalStyle.modalView}>
            <TouchableOpacity
              style={{ marginLeft: 280 }}
              onPress={() => setLoginModal(!loginModal)}
            >
              <EvilIcons name="close" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitGoogle}
              underlayColor="grey"
              onPress={() => {
                // console.log('onPre')
                signInWithGoogleAsync(navigation, dispatch, "backup");
                setLoginModal(!loginModal)
              }}
            >
              <View style={styles.insideSubmit}>
                <View>
                  <Image
                    style={{ width: 30, height: 30 }}
                    source={require("../../assets/google-logo.png")}
                  />
                </View>
                <View style={{ marginLeft: "10%" }}>
                  <Text style={[styles.submitText, { marginRight: 10 }]}>
                    เข้าสู่ระบบด้วย Google
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={netModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setNetModal(!netModal);
        }}
      >
        <View style={globalStyle.centeredView}>
          <View style={globalStyle.modalView}>
            <TouchableOpacity
              style={{ marginLeft: 280 }}
              onPress={() => setNetModal(!netModal)}
            >
              <EvilIcons name="close" size={24} color="black" />
            </TouchableOpacity>

            
            <Text style={globalStyle.modalText}>ต้องการอินเตอร์เน็ตในการสำรองข้อมูล</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerTitleContain: {
    paddingTop: "5%",
    marginTop: 20,
    width: "100%",
    alignItems: "center"
    // flex: 1
  },
  hiddenLine: {
    width: Dimensions.get("screen").width,
    height: 10
    // backgroundColor:'red',
  },
  showLine: {
    marginTop: 8,
    width: (Dimensions.get("screen").width * 90) / 100,
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "grey",
    // backgroundColor:'grey',
    opacity: 0.25
  },
  submitGoogle: {
    // marginRight: 40,
    // marginLeft: 40,
    paddingLeft: "5%",
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "75%",
    height: 50,
    flex: 0,
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  submitFacebook: {
    // marginRight: 40,
    // marginLeft: 40,
    marginTop: 10,
    paddingLeft: "5%",
    backgroundColor: "#4267B2",
    borderRadius: 10,
    width: "75%",
    height: 50,
    flex: 0,
    alignItems: "center",
    // justifyContent: 'center',
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  submitText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "Prompt-Light"
  },
  insideSubmit: {
    flexDirection: "row",
    alignItems: "center"
  }
});
