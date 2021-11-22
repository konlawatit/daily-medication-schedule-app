import { StyleSheet, Dimensions } from "react-native";
import { Ionicons, EvilIcons, Entypo, AntDesign } from "@expo/vector-icons";
//AddMedicineScreens , Dailyscreens
export const globalStyle = StyleSheet.create({
  screen: {
    marginBottom: 15,
    alignItems: "center",
  },
  textThai: {
    fontFamily: "Prompt-Light",
    fontSize:14
  },
  //container ของ AddMedicineScreens
  Addcontainer: {
    backgroundColor: "rgba(85,194,255,0.8)",
    alignItems: "center",
    height: '100%',
    paddingTop: 60
  },
  container: {
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
    backgroundColor:"white",
    padding:1,
    justifyContent:"center"
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
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
    // backgroundColor:'grey',
    opacity: 0.25,
    alignSelf: "center",
    marginBottom:8
  },
  //เส้นใต้ยาที่ต้องทานวันนี้
  line: {
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "grey",
    opacity: 0.25,
    
  },
  infoContain: {
    width: "90%",
    height: 350,
    borderRadius: 20,
    padding: 15,
    backgroundColor: "#ffff",
    shadowColor: "#000",
    elevation: 5,
    marginTop: 50,
  },
  sectionDropDown: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  sectionTextInput: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
    paddingRight: "10%",
    alignItems: "center",
    backgroundColor: "white",
  },
  sectionFilter: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginTop: 15,
    height: 45,
  },
  ImageStyle: {
    padding: 2,
    marginLeft: "10%",
    height: 30,
    width: 30,
    resizeMode: "stretch",
  },
  SectionStyle: {
    flexDirection: "row",
    alignItems: "center",
    height: 25,
    margin: 2,
    marginBottom:0
  },
  bottomTabs: {
    flex: 1,
    flexDirection:"row",
    width: "100%",
    position: "absolute",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    backgroundColor:"white",
    paddingTop:"1%",
    paddingBottom:"1%",
    bottom: 0,
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
    padding: 20,
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
    flex:1,
    margin:5
  },
  buttonClose: {
    backgroundColor: '#8bc34a',
  },
  buttonCancel: {
    backgroundColor: '#eb3148',
  },
  textStyle: {
    color: 'white',
    fontFamily: "Prompt-Light",
    fontWeight: 'bold',
    textAlign: 'center',
  },  
  modalText: {
    marginBottom: 15,
    fontSize:18,
    fontFamily: "Prompt-Light",
    textAlign: 'center',
  },
  confirmText: {
    color: "rgba(0,0,0,1)",
    fontSize: 20,
    fontFamily: "Prompt-Regular",
  },
});
