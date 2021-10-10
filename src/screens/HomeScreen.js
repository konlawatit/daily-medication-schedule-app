import React, { useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import AppContext from "../components/AppContext";

export default function HomeScreen({ navigation }) {
  const context = useContext(AppContext);
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
