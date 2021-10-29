import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(85,194,255,0.5)", "transparent"]}
        style={styles.background}
      />

      <TouchableOpacity>
        <Image source={require("../../assets/profile-user.png")} />
      </TouchableOpacity>

      <View style={styles.row}>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <Text>ชื่อผู้ใช้งาน</Text>
          <TextInput style={styles.input} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={{ flexDirection: "column", flex: 1, paddingRight: 10 }}>
          <Text>ชื่อ</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <Text>นามสกุล</Text>
          <TextInput style={styles.input} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={{ flexDirection: "column", flex: 1, paddingRight: 10 }}>
          <Text>เพศ</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={{ flexDirection: "column", flex: 1, paddingRight: 10 }}>
          <Text>วันเกิด</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <Text>น้ำหนัก</Text>
          <TextInput style={styles.input} />
        </View>
      </View>

      <View style={styles.row}>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <Text>ประวัติการแพ้ยา(อย่าลืมลองกับ IOS)</Text>
          <TextInput
            style={{
              borderRadius: 5,
              backgroundColor: "white",
              padding: 5
            }}
            numberOfLines={5}
            multiline
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(236,59,255,0.5)",
    alignItems: "center",
    justifyContent: "center"
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    flex: 1
  },
  input: {
    height: 40,
    borderRadius: 5,
    backgroundColor: "white",
    padding: 5
  },
  row: {
    width: "80%",
    flexDirection: "row",
    marginTop: 10
  }
});
