import React, { useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import AppContext from "../components/AppContext";

import { signInAnonymous, signInWithGoogleAsync, firebase } from "../../firebase";

export default function HomeScreen({ navigation }) {
  const context = useContext(AppContext);

  firebase.auth().onAuthStateChanged((user) => {
    console.log(user) //get user data
  })

  return (
    <View style={styles.container}>
      <Text>
        HomeScreen <Text style={{ color: "red" }}>{context.user.name}</Text>
      </Text>
      <Button
        title="Go to Dashboard Screen"
        onPress={() => navigation.navigate("Dashboard", { name: "Hi" })}
      />
      <Button
        title="Chnage name"
        onPress={() =>
          context.user.name !== "Bas"
            ? context.user.setName("Bas")
            : context.user.setName("Ball")
        }
      />
      <Button title="signIn anonymous" onPress={()=> {
        signInAnonymous();
      }} />
      <Button title="signin google" onPress={() => {
        signInWithGoogleAsync();
      }} />
      <Button title="logout"  onPress={() => {firebase.auth().signOut()}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
