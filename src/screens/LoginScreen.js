import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import { signInWithGoogleAsync, logInFacebook } from '../../firebase'

export default function LoginScreen({navigation}) {

  return (
    <View style={styles.container}>
     <LinearGradient
        // Background Linear Gradient
        colors={['rgba(85,194,255,0.5)', 'transparent']}
        style={styles.background}
      />
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <View style={styles.container1} >
        <Text style={styles.title}>Daily Medication</Text>
        <Text style={styles.title} >Schedule</Text>
      </View>
      
      <TouchableOpacity style={styles.submit} underlayColor="grey" onPress={() => navigation.navigate("Home")} >
          <View style={styles.insideSubmit} >
              <View>
                <Image style={{width: 30, height: 30}} source={require('../../assets/profile.png')} />
              </View>
              <View style={{marginLeft: "10%", width: "60%", alignItems:"center"}} >
                <Text style={styles.submitText} >เข้าใช้งาน</Text>
              </View>
          </View>
      </TouchableOpacity>

      <View style={styles.line} />

      <TouchableOpacity style={styles.submitGoogle} underlayColor="grey" onPress={() => {
          signInWithGoogleAsync();
        }} >
          <View style={styles.insideSubmit} >
              <View>
                <Image style={{width: 30, height: 30}} source={require('../../assets/google-logo.png')} />
              </View>
              <View style={{marginLeft: "10%"}} >
                <Text style={styles.submitText} >เข้าสู่ระบบด้วย Google</Text>
              </View>
          </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitFacebook} underlayColor="grey" onPress={() => {
          logInFacebook();
        }}>
          <View style={styles.insideSubmit} >
              <View>
                <Image style={{width: 30, height: 30}} source={require('../../assets/facebook-logo.png')} />
              </View>
              <View style={{marginLeft: "10%"}}>
                <Text style={{color: "white", fontSize: 16}} >เข้าสู่ระบบด้วย Facebook</Text>
              </View>
          </View>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(236,59,255,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  logo: {
      width: 200,
      height: 200
  },
  container1: {
      alignItems: "center",
      marginTop: 20,
      marginBottom: 20     
  },
  title: {
      fontSize: 35,
      fontWeight: "bold",
      color: "white"
  },
  submit: {
    marginRight: 40,
    marginLeft: 40,
    paddingLeft: 25,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '75%',
    height: 50,
    flex: 0,
    alignItems: 'center',
    flexDirection: 'row'
  },
  submitGoogle: {
    marginRight: 40,
    marginLeft: 40,
    paddingLeft: 25,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '75%',
    height: 50,
    flex: 0,
    alignItems: 'center',
    flexDirection: 'row'
  },
  submitFacebook: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingLeft: 25,
    backgroundColor: '#4267B2',
    borderRadius: 10,
    width: '75%',
    height: 50,
    flex: 0,
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
  },
  submitText: {
    color: '#000',
    fontSize: 16
  },
  insideSubmit: {
      flexDirection: "row",
      alignItems: "center",
  },
  line: {
      borderWidth: 1,
      borderColor: "white",
      width: "70%",
      marginTop: 20,
      marginBottom: 20
  },

  
});
