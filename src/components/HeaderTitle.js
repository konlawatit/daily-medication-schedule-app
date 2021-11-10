import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
export default function HeaderTitle(props) {
  return (
    <View style={styles.headerTitleContain}>
      <View style={styles.hiddenLine}></View>
      <View>
        <Text style={{ fontSize: 25 ,fontFamily:"Prompt-Light"}}>{props.title}</Text>
        <View style={styles.showLine}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerTitleContain: {
    paddingTop: "5%",
    width: "100%",
    alignItems: "center",
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
  }
});
