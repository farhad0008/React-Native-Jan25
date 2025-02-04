 import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Image, StyleSheet, ScrollView,Slider } from "react-native";
import { Checkbox, RadioButton } from "react-native-paper";
import * as ImagePicker from "react-native-image-picker";
import DatePicker from "react-native-datepicker";
import DateTimePicker from '@react-native-community/datetimepicker';

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
const[date,setDate]=useState(new Date())
const[mode,setMode]=useState('date')
const[show,setShow]=useState(false)

const onChange=(event,selectedDate)=>{
  const currentDate=selectedDate || date;
  // setShow(Platform.OS === 'ios')
  // setShow(Platform.OS === 'ios' ? false : true);
  setDate(currentDate)
  setShow(false);
};
const ShowMode=(currentMode)=>{
  setShow(true);
  setMode(currentMode)
}
const showDatePicker=()=>{
  ShowMode('date')
}
const showTimePicker=()=>{
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

  // another way to images 
  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibrary({ mediaType: "photo", cameraType: 'front', selectionLimit: 1 });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setProfilePic(result.assets[0].uri);
    }
  };
  console.log(profilePic);

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
    {show &&(
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
