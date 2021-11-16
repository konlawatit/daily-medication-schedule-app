import React, { useEffect } from "react"
import { StyleSheet, View, Button } from "react-native"
import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"

// Show notifications when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
    }
  },
})
<<<<<<< Updated upstream

export default function TestNoti({navigation}) {
  useEffect(() => {
=======
const timList = [{
  "MEDICINE_id": 2,
  "day":{
    "fr": 1,
    "mo": 1,
    "sa": 1,
    "su": 1,
    "th": 1,
    "tu": 1,
    "we": 1,
  },
  "description": "กินนิดเดียว",
  "id": 3,
  "image": null,
  "name": "ยานอนหลับ",
  "note": "กิน1เม็ด",
  "status": 0,
  "time": "0:30",
  },
  {
  "MEDICINE_id": 3,
  "day":{
    "fr": 1,
    "mo": 1,
    "sa": 1,
    "su": 1,
    "th": 1,
    "tu": 1,
    "we": 1,
  },
  "description": "กินนิดเดียว",
  "id": 4,
  "image": null,
  "name": "ยาฟฟฟ",
  "note": "กิน1เม็ด",
  "status": 0,
  "time": "13:00",
},

]

export default function TestNoti({navigation}) {
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const checkDate = date.getHours().toString()+":"+date.getMinutes().toString()
      console.log(checkDate+date.getSeconds().toString())
      timList.forEach((item)=>{
        if(checkDate == item.time){
          triggerLocalNotificationHandler(item)
        }
      })
      
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
>>>>>>> Stashed changes
    // Permission for iOS
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then(statusObj => {
        // Check if we already have permission
        if (statusObj.status !== "granted") {
          // If permission is not there, ask for the same
          return Permissions.askAsync(Permissions.NOTIFICATIONS)
        }
        return statusObj
      })
      .then(statusObj => {
        // If permission is still not given throw error
        if (statusObj.status !== "granted") {
          throw new Error("Permission not granted")
        }
      })
      .catch(err => {
        return null
      })
  }, [])

  useEffect(() => {
    const receivedSubscription = Notifications.addNotificationReceivedListener(
      notification => {
        console.log("Notification Received!")
        navigation.navigate("Noti")
      }
    )

    const responseSubscription = Notifications.addNotificationResponseReceivedListener(
      response => {
        console.log("Notification Clicked!")
        navigation.navigate("Noti")
      }
    )
    return () => {
      receivedSubscription.remove()
      responseSubscription.remove()
    }
  }, [])

  const triggerLocalNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Local Notification",
        body: "Hello this is a local notification!",
        sound: "TF050.WAV",
      },
      trigger: { seconds: 5 },
    })
  }

  return (
    <View style={styles.container}>
      <Button
        title="Trigger Local Notification"
        onPress={triggerLocalNotificationHandler}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})