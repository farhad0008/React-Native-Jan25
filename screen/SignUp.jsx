import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Image, StyleSheet, ScrollView, Slider, Platform, PermissionsAndroid } from "react-native";
import { Checkbox, RadioButton } from "react-native-paper";
import * as ImagePicker from "react-native-image-picker";
import DatePicker from "react-native-datepicker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { request, PERMISSIONS ,RESULTS } from 'react-native-permissions';

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Male");
  // const [dob, setDob] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  //date time picker need install  npm install @react-native-community/datetimepicker
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios')
    // setShow(Platform.OS === 'ios' ? false : true);
    setDate(currentDate)
    setShow(false);
  };
  const ShowMode = (currentMode) => {
    setShow(true);
    setMode(currentMode)
  }
  const showDatePicker = () => {
    ShowMode('date')
  }
  const showTimePicker = () => {
    ShowMode('time')
  }
  // Function to select image
  // const selectImage = () => {
  //   ImagePicker.launchImageLibrary({ mediaType: "photo",cameraType:'front',selectionLimit:1}, (response) => { //launchCamera()
  //     if (!response.didCancel && response.assets && response.assets.length > 0) {
  //       setProfilePic(response.assets[0].uri);
  //     }
  //   });
  // }

  // Function to request camera permission
  // const requestCameraPermission = async () => {
  //   // console.log("requestCameraPermission")
  //   if (Platform.OS === "android") {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       {
  //         title: "Camera Permission",
  //         message: "This app needs access to your camera to take pictures.",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK",
  //       }
  //     );
  //     return granted === PermissionsAndroid.RESULTS.GRANTED;
  //   } else {
  //     const result = await request(PERMISSIONS.IOS.CAMERA);
  //     return result === RESULTS.GRANTED;
  //   }
  // }

  //function to request media Gallery:
  // const requestGalleryPermission = async () => {
  //   // console.log("requestCameraPermission")
  //   if (Platform.OS === "android") {
  //     const permission =
  //       Platform.Version >= 33 ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
  //     const granted = await PermissionsAndroid.request(permission,
  //       {
  //         title: "Gallery Permission",
  //         message: "This app needs access to your Gallery to take pictures.",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK",
  //       }
  //     );
  //     console.log(granted)
  //     return granted === PermissionsAndroid.RESULTS.GRANTED;
  //   } else {
  //     const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
  //     return result === RESULTS.GRANTED;
  //   }
  // }
  const requestGalleryPermission = async () => {
    // const androidVersion = parseInt(Platform.Version, 10);
    const permission = Platform.Version >=33
    // androidVersion >= 33
        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
  
    const result = await request(Platform.OS === "android" ? permission : PERMISSIONS.IOS.PHOTO_LIBRARY);
    return result === RESULTS.GRANTED;
  }
  
  const requestCameraPermission = async()=>{
    const result = await request(Platform.OS==="android"? PERMISSIONS.ANDROID.CAMERA:PERMISSIONS.IOS.CAMERA);
    // const result = await request(Platform.OS === "android" ? PERMISSIONS.ANDROID.READ_CALENDAR : PERMISSIONS.IOS.CALENDARS);
    // const result = await request(PERMISSIONS.IOS.NOTIFICATIONS);//Android: Not required explicitly, handled by Firebase.
    // const result = await request(Platform.OS === "android" ? PERMISSIONS.ANDROID.BLUETOOTH_CONNECT : PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL);
    // const result = await request(Platform.OS === "android" ? PERMISSIONS.ANDROID.READ_CONTACTS : PERMISSIONS.IOS.CONTACTS);
    // const result = await request(Platform.OS === "android" ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION  : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    // const result = await request(Platform.OS === "android" ? PERMISSIONS.ANDROID.RECORD_AUDIO   : PERMISSIONS.IOS.MICROPHONE);
  
    return result===RESULTS.GRANTED;
  }

  const selectImage = async () => {
    // console.log("selectImage")
    const hasPermission = await requestGalleryPermission();
    // const hasPermission = await requestCameraPermission();
    console.log(hasPermission)
    if (!hasPermission) {
      Alert.alert("Permission Denied", "Camera access is required to take pictures.");
      return;
    }
    const result = await ImagePicker.launchImageLibrary({//launchCamera 
      mediaType: "photo",//video
      cameraType: "front",
      selectionLimit: 1,
    });
    console.log(result);
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setProfilePic(result.assets[0].uri);
    }
  }

  // another way to images 
  // const selectImage = async () => {
  //   const result = await ImagePicker.launchCamera({ mediaType: "photo", cameraType: 'front', selectionLimit: 1 });//launchImageLibrary 
  //   if (!result.didCancel && result.assets && result.assets.length > 0) {
  //     setProfilePic(result.assets[0].uri);
  //   }
  // };
  // console.log(profilePic);

  // Function to handle signup
  const handleSignup = () => {
    if (!name || !email || !password || !confirmPassword || !phone || !date || !termsAccepted) {
      Alert.alert("Error", "Please fill all fields and accept terms!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
    Alert.alert("Success", "Signup successful!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Signup</Text>

      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />

      <Text style={styles.label}>Gender</Text>
      <RadioButton.Group onValueChange={setGender} value={gender}>
        <View style={styles.radioContainer}>
          <View style={styles.radio}>
            <RadioButton value="Male" />
            <Text>Male</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton value="Female" />
            <Text>Female</Text>
          </View>
          <View style={styles.radio}>
            <RadioButton value="Other" />
            <Text>Other</Text>
          </View>
        </View>
      </RadioButton.Group>

      {/* <DatePicker style={styles.datePicker} date={dob} mode="date" placeholder="Select Date" format="YYYY-MM-DD" confirmBtnText="Confirm" cancelBtnText="Cancel" onDateChange={setDob} /> */}
      <Text style={styles.label}>Date of Birth</Text>
      <Button title="Select date of Birth" onPress={showDatePicker} />
      {show && (
        <DateTimePicker
          testID="datetimepicker"
          value={date}
          mode={mode}
          display="default"
          onChange={onChange}
          is24Hour={true}
        />)}


      <Text style={styles.label}>Profile Picture</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
        {profilePic ? <Image source={{ uri: profilePic }} style={styles.image} /> : <Text>Select Image</Text>}
      </TouchableOpacity>

      <View style={styles.checkboxContainer}>
        <Checkbox status={termsAccepted ? "checked" : "unchecked"} onPress={() => setTermsAccepted(!termsAccepted)} />
        <Text>I accept the Terms & Conditions</Text>
      </View>

      <Button title="Signup" onPress={handleSignup} />
      {/* <Slider minimumValue={0} maximumValue={100}/> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, justifyContent: "center", backgroundColor: "#f9f9f9" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { backgroundColor: "#fff", padding: 10, marginVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#ccc" },
  label: { marginTop: 10, fontSize: 16, fontWeight: "bold" },
  radioContainer: { flexDirection: "row", justifyContent: "space-around", marginVertical: 10 },
  radio: { flexDirection: "row", alignItems: "center" },
  datePicker: { width: "100%", marginVertical: 10 },
  imagePicker: { backgroundColor: "#ddd", padding: 15, alignItems: "center", borderRadius: 10, marginVertical: 10 },
  image: { width: 100, height: 100, borderRadius: 50 },
  checkboxContainer: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
});

export default SignupScreen;
