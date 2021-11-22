import React, { useContext, useEffect, useState, useRef } from "react";
import Constants from 'expo-constants';
import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  CheckBox,
  ScrollView,
  SafeAreaView,
  FlatList,
  Dimensions,
  
  TouchableHighlight
} from "react-native";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import {globalStyle} from "../stylesheet/globalStylesheet";

//sqlite
import { getDailyMedicine } from "../database/database-function";

//Components
import HeaderTitle from "../components/HeaderTitle";
import DailyCard from "../components/DailyCard";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }
  },
})
export default function DailyScreen({ navigation }) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [intervalID, setIntervalID] = useState(0);
  var days = ['su','mo','tu','we','th','fr','sa'];
  var timeList = useSelector((state) => state.medicine.time);
  timeList = timeList.sort(function(a, b) {
    var keyA = a.time,
      keyB = b.time;
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  timeList = timeList.filter(x=>x.status==0)
  var day = days[ new Date().getDay() ];
  timeList = timeList.filter(x=>x.day[day]==1)

  // NOTI BLOCK
  useEffect(() => {
    const interval = setInterval(() => {
      setIntervalID(intervalID+1)
      
      const date = new Date();
      const checkDate = (date.getHours()<10?'0':'')+date.getHours().toString()+":"+(date.getMinutes()<10?'0':'')+date.getMinutes().toString()
      // console.log(checkDate+":"+date.getSeconds().toString())
      if(date.getSeconds()==0){
        console.log("Passed")
        timeList.forEach((item)=>{
          if(item.isNoti==1){
            if(checkDate == item.time){
              triggerLocalNotificationHandler(item)
            }
        }
        })
      }

      
    }, 1000);
    return () => clearInterval(interval);
  }, [intervalID]);
  
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log("Notification Received!")
      navigation.navigate("Noti",{data:notification.request.content.data})
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Notification Clicked!")
      navigation.navigate("Noti",{data:response.notification.request.content.data})
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);



  const triggerLocalNotificationHandler = (item) => {
    console.log("Fire1")
    Notifications.scheduleNotificationAsync({
      content: {
        title: "📬  ถึงเวลารับประทาน"+item.name,
        body: item.time+"น.  "+item.description,
        sound: "TF050.WAV",
        data: item,
      },
      trigger:{seconds:2}
    })
  }
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      console.log('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }
// END NOTI BLOCK




  const renderItem = (itemData) => {
    return (
      <View style={globalStyle.screen}>
          <DailyCard
            title={itemData.item.time}
            subTitle={itemData.item.name}
            verify={itemData.item.status}
            checkBox={true}
            id={itemData.item.id}
            idMed={itemData.item.MEDICINE_id}
            navigation={navigation}
            image={itemData.item.image}
          />
      </View>
    );
  };

  return (
    <View style={globalStyle.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(255,255,255,1)", "transparent"]}
        style={globalStyle.background}

      />

      <HeaderTitle title="ยาที่ต้องทานวันนี้" navigation={navigation} />

      <FlatList
        keyExtractor={(item, index) => item.id.toString()}
        style={{ marginTop: 10, marginBottom: "0%" }}
        data={timeList}
        renderItem={renderItem}
      />
    </View>
  );
}
