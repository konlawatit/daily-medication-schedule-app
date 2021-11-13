import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import AppContext from "../components/AppContext";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSelector } from "react-redux";

import {
  signInAnonymous,
  signInWithGoogleAsync,
  firebase,
  logInFacebook,
} from "../../firebase";

export default function HomeScreen({ navigation }) {
  const context = useContext(AppContext);
  const [username, setUsernmae] = useState("");
  const [password, setPassword] = useState("");

  

  // firebase.auth().onAuthStateChanged((user) => {
  //   console.log(user) //get user data
  // })

  const registerSchema = Yup.object().shape({
    username: Yup.string().min(4, "ไม่น้อยกว่า 4 ตัวอักษร").max(15, "ไม่มากกว่า 15 ตัวอักษร").required('จำเป็นต้องกรอก'),
    password: Yup.string().min(4, "กรอกมากกว่า 4 อักษร").required('จำเป็นต้องกรอก'),
    confirmpassword: Yup.string().min(4, "กรอกมากกว่า 4 อักษร").test('passwords-match', 'รหัสผ่านไม่ตรง', function (value) {
      return this.parent.password === value;
    })
  })

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: "", password: "", confirmpassword: ""}}
        onSubmit={(values) => {
           console.log('onsubmit', values)
           signInAnonymous(values.username, values.password)
          }}
        validationSchema={registerSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <View>
            <TextInput
              name="username"
              placeholder="username"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              style={styles.input}
            />
            {(errors.username && touched.username) && <Text style={{fontSize: 10, color: 'red'}} >{errors.username}</Text>}
      
            <TextInput
              name="password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              style={styles.input}
            />
            {(errors.password && touched.password) && <Text style={{fontSize: 10, color: 'red'}} >{errors.password}</Text>}

            <TextInput
              name="confirmpassword"
              onChangeText={handleChange("confirmpassword")}
              onBlur={handleBlur("confirmpassword")}
              value={values.confirmpassword}
              style={styles.input}
            />
            {(errors.confirmpassword && touched.confirmpassword) && <Text style={{fontSize: 10, color: 'red'}} >{errors.confirmpassword}</Text>}

            <Button onPress={handleSubmit} title="Submit" disabled={!isValid} />
          </View>
        )}
      </Formik>

      <Button
        title="Go to Dashboard Screen"
        onPress={() => navigation.navigate("Dashboard", { name: "Hi" })}
      />
      <Button
        title="signIn anonymous"
        onPress={() => {
          signInAnonymous('bass254312', '1233');
        }}
      />
      <Button
        title="logout"
        onPress={() => {
          firebase.auth().signOut();
        }}/>
      {/* <Text>
        HomeScreen <Text style={{ color: "red" }}>{context.user.name}</Text>
      </Text>
      
      <Button
        title="Chnage name"
        onPress={() =>
          context.user.name !== "Bas"
            ? context.user.setName("Bas")
            : context.user.setName("Ball")
        }
      />
      <Text>usename: {username}</Text>
      <Text>password: {password}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setUsernmae(text);
        }}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <Button title="signin username/pasword" />
      
      <Button
        title="signin google"
        onPress={() => {
          signInWithGoogleAsync();
        }}
      />
      <Button
        title="sigin facebook"
        onPress={() => {
          logInFacebook();
        }}
      />
       */}
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
