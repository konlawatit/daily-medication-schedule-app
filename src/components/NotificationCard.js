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
  FlatList
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

//Components

export default function NotificationCard({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.cardMedicine}>
      <View style={styles.imagePart}>
        <Image
          style={{ width: "60%", height: "50%", marginTop: 10 }}
          source={require("../../assets/sun.png")}
        />
      </View>
      <View style={styles.infoPart}>
        <Text style={{ fontSize: 40, color: "white" }}>12:00</Text>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text style={styles.daysOfweek}>จ</Text>
          <Text style={styles.daysOfweek}>อ</Text>
          <Text style={styles.daysOfweek}>พ</Text>
          <Text style={styles.daysOfweek}>พฤ</Text>
          <Text style={styles.daysOfweek}>ศ</Text>
          <Text style={styles.daysOfweek}>ส</Text>
          <Text style={styles.daysOfweek}>อา</Text>
        </View>
      </View>
      <View style={styles.switchPart}>
        <Switch
          style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
          trackColor={{ false: "#767577", true: "#04A438" }}
          thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  daysOfweek: {
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    color: "white"
  },
  cardMedicine: {
    flexDirection: "row",
    backgroundColor: "rgba(85,194,255,8)",
    width: "90%",
    height: 100,
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.39,
    shadowRadius: 100.3,
    elevation: 5,
    alignItems: "center"
  },
  imagePart: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%"
  },
  infoPart: {
    flex: 1,
    justifyContent: "flex-start"
  },
  switchPart: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  }
});
