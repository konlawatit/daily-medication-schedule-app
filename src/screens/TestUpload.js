import React, { useEffect, useState } from "react";
import { StyleSheet, View, Button, Image } from "react-native";
import * as Notifications from "expo-notifications";
import { date } from "yup";
// import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Asset, useAssets } from "expo-asset";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../firebase";

export default function TestUpload({ navigation }) {
  const [assets] = useAssets([require("../../assets/test.jpg")]);
  const [pickedImagePath, setPickedImagePath] = useState()
  const [imageUri, setImageUri] = useState();

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log( await uploadImage(result.uri, 'test-1'))
    }
  };

  const uploadImage = async (uid, uri, imageName) => {
      const response = await fetch(uri);
      const blob = await response.blob();

      let ref = firebase.storage().ref().child("images/" + imageName)
    //   console.log(await ref.getDownloadURL())
    //   console.log('ref --->', ref.storage)
        ref.put(blob)
      return await ref.getDownloadURL()
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
      <Button
        title="Trigger Local Notification"
        onPress={async () => {
          const filename = "teest2";

          console.log(assets);
          //   if (perm.status != "granted") {
          //     return;
          //   }

          //   const asset = "../../assets/test.jpg"
          //   const uri =
          //     "http://www.flexibleproduction.com/wp-content/uploads/2017/06/test-intelligenza-sociale.jpg";
          //   const fileUri = `${FileSystem.documentDirectory}${filename}`;
          // //   const downloadedFile = await
          //   FileSystem.downloadAsync(uri, fileUri).then(file => {
          //       setImageUri(file.uri)
          //   })

          //   if (downloadedFile.status != 200) {
          //     handleError();
          //   }
          //   console.log(downloadedFile);
        }}
      />
      <Button title="upload iamge" onPress={() => {
          showImagePicker();
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
