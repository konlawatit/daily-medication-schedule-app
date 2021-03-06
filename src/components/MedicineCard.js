import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { useDispatch } from "react-redux";
import { selectMedicine } from "../store/actions/medicineAction";


export default function MedicineCard(props) {
  //   let image2 = require("../../assets/" + props.image)
  const dispatch = useDispatch();
  const [id, setId] = useState(props.id)
  const [image, setImage] = useState(props.image)
  let title = props.title
  let subTitle = props.subTitle
  const navigation = props.navigation

  

  return (
    <TouchableOpacity style={styles.card} onPress={() => {
      console.log('--->',id)
        dispatch(selectMedicine(id))
        navigation.navigate("DrugInfo", { id });
      }} >
      <View style={{ flex: 0.7 }}>
        {image? (<Image
          style={{ width: "100%", height: 150 }}
          source={{uri: image}}
        />) : (<Image
          style={{ width: "100%", height: 150 }}
          source={require("../../assets/test.jpg")}
        />) }
        
      </View>
      <View style={{ flex: 1, padding: 15 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{fontFamily:"Prompt-Light" ,fontSize: 30 }}>{title}</Text>
        </View>
        <View style={styles.line}></View>

        <Text style={{fontFamily:"Prompt-Light" ,fontSize: 18 }}>{subTitle}</Text>
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
});
