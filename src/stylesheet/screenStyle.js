import { StyleSheet } from "react-native";

//AddMedicineScreens , Dailyscreens
export default StyleSheet.create({
  screen: {
    marginBottom: 15,
    alignItems: "center",
  },
  textThai:{
    fontFamily:'Prompt-Light',
  },
  //container ของ AddMedicineScreens
  Addcontainer: {
    backgroundColor: "rgba(85,194,255,0.8)",
    height: "100%",
    alignItems: "center",
    flex: 1,
  },
  container:{
    backgroundColor: "rgba(85,194,255,0.8)",
    height: "100%",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "150%",
    flex: 1,
  },
  //รูปตัวยา
  imageBox: {
    width: 150,
    height: 150,
    overflow: "hidden",
    borderRadius: 150,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  //เพิ่มรูปภาพ
  addButton: {
    position: "absolute",
    alignSelf: "flex-end",
    right: -5,
    width: 50,
    height: 50,
  },
  textInput: {
    textAlign: "center",
    backgroundColor: "white",
    height: 40,
    borderColor: "grey",
    borderRadius: 5,
    borderWidth: 1,
  },
  //เส้นคั้นใต้เวลาที่ต้องทาน
  showLine: {
    marginTop: 8,
    width: "95%",
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "grey",
    // backgroundColor:'grey',
    opacity: 0.25,
    alignSelf: "center",
  },
  //เส้นใต้ยาที่ต้องทานวันนี้
  line: {
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "grey",
    opacity: 0.25
  },
  infoContain: {
    width: "90%",
    height: 350,
    borderRadius: 20,
    padding: 15,
    backgroundColor: "#ffff",
    shadowColor: "#000",
    elevation: 5,
    marginTop: 50
  },
});
