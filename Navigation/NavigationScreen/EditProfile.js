import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput ,Platform} from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import { AppImages } from '../../assets/images';
import * as ImagePicker from "react-native-image-picker";
import { request, PERMISSIONS ,RESULTS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({ route }) => {
    const [editprofileData, seteditprofileData] = useState({})
    const navigation = useNavigation();


    const handleUpdate = async () => {
        console.log(editprofileData);
        try {
            const token = await AsyncStorage.getItem('userToken');
            const formData = new FormData();
    
            if (editprofileData.avatar) {
                const imgname = editprofileData.avatar.split('/').slice(-1)[0];
                formData.append('image', {
                    uri: editprofileData.avatar.uri, // Ensure this key is correct
                    type: editprofileData.avatar.mime, 
                    name: imgname,
                });
            }
    
            formData.append('name', editprofileData.name);
            formData.append('email', editprofileData.email);
            formData.append('college', editprofileData.college);
            formData.append('state', editprofileData.state);
    
            console.log("formData:", formData);
    
            const response = await fetch('https://test.moprep.in/api/updateUserProfile', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'// Remove 'Content-Type', let fetch handle it
                },
                body:JSON.stringify(formData), // Do NOT stringify FormData
            });
    
            const data = await response.json();
            if (data.error) {
                console.log("Update API response error", data);
            } else {
                console.log('Successfully updated', data);
                navigation.goBack();
            }
        } catch (e) {
            console.error("handleUpdateError", e);
        }
    };
    

      const requestGalleryPermission = async () => {
        // const androidVersion = parseInt(Platform.Version, 10);
        const permission = Platform.Version >=33
        // androidVersion >= 33
            ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
            : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      
        const result = await request(Platform.OS === "android" ? permission : PERMISSIONS.IOS.PHOTO_LIBRARY);
        return result === RESULTS.GRANTED;
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
            // setProfilePic(result.assets[0].uri);
            seteditprofileData({...editprofileData,avatar:result.assets[0].uri})
          }
        }

    useEffect(() => {
        const { profileDataEdt } = route?.params;
        // console.log('profileDataEdt',profileDataEdt)
        seteditprofileData(profileDataEdt);
    }, [])
    return (
        <ScrollView
            style={{
                backgroundColor: 'rgba(245, 249, 255, 1)', paddingHorizontal: 20,
                flex: 1,
            }}>
            {/* ---------BackHeader------- */}
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name='arrowleft' size={25} color={'black'} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15 }}>EditProfile</Text>
            </View>

            {/* ---------images--- */}
            <View style={{ alignSelf: 'center', marginTop: 20 }}>
                <Image
                    source={{ uri: editprofileData.avatar }}
                    style={{
                        height: 101,
                        width: 101,
                        borderWidth: 3,
                        borderColor: 'rgba(22, 127, 113, 1)',
                        borderRadius: 50,
                    }}
                // resizeMode="contain"
                />
                <TouchableOpacity
                onPress={()=>selectImage()}
                style={{borderWidth:3,borderColor:'rgba(22, 127, 113, 1)',borderRadius:10,
                    position:'absolute',bottom:0,right:0,height:40,width:40,justifyContent:'center',alignItems:'center',
                    backgroundColor:'white'
                }}
                >
                    <Image
                        source={AppImages.GALLERY}
                        style={{height:20,width:20}}
                    />
                </TouchableOpacity>
            </View>

            {/* Input controll */}
            <View style={styles.inputContainer}>
                <View style={styles.inputParent}>
                    <FontAwesome name={'user'} size={22} color={'black'} />
                    <TextInput
                        style={[styles.input]}
                        placeholder="Name"
                        // secureTextEntry={shownPass}
                        value={editprofileData.name}
                        onChangeText={(val) => seteditprofileData({ ...editprofileData, name: val })}
                    />
                    <TouchableOpacity
                    // onPress={() => setShownPass(!shownPass)}
                    >
                        {/* <Feather name={shownPass ? 'eye-off' : 'eye'} size={22} color={'gray'} /> */}
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.inputParent}>
                    <Feather name={'mail'} size={22} color={'black'} />
                    <TextInput
                        style={[styles.input]}
                        placeholder="Email ID"
                        keyboardType="email-address"  // Ensures proper keyboard layout
                        autoCapitalize="none"  // Prevents automatic capitalization
                        autoCorrect={true}  // Disables auto-correct
                        value={editprofileData.email}
                        onChangeText={(val) => seteditprofileData({ ...editprofileData, email: val })}
                    />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.inputParent}>
                    {/* <Feather name={'graduation-cap'} size={22} color={'gray'} /> */}
                    <Entypo name={'graduation-cap'} size={20} color={'black'} />
                    <TextInput
                        style={[styles.input]}
                        placeholder="Collage"
                        keyboardType="email-address"  // Ensures proper keyboard layout
                        autoCapitalize="none"  // Prevents automatic capitalization
                        autoCorrect={true}  // Disables auto-correct
                        value={editprofileData.college}
                        onChangeText={(val) => seteditprofileData({ ...editprofileData, college: val })}
                    />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.inputParent}>
                    <Entypo name={'location-pin'} size={20} color={'black'} />
                    <TextInput
                        style={[styles.input]}
                        placeholder="Collage"
                        keyboardType="email-address"  // Ensures proper keyboard layout
                        autoCapitalize="none"  // Prevents automatic capitalization
                        autoCorrect={true}  // Disables auto-correct
                        value={editprofileData.state}
                        onChangeText={(val) => seteditprofileData({ ...editprofileData, state: val })}
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Register</Text>
                <View style={styles.btnRound}>
                    <Feather name={'arrow-right'} size={25} color={'black'} />
                </View>
            </TouchableOpacity>

        </ScrollView>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        marginVertical: 7,
        justifyContent: 'space-between',
        height: 'auto',
    },
    inputParent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
        flex: 1,
    },
    input: {
        padding: 0,
        flex: 1,
        marginHorizontal: 10,
        fontWeight: 'bold',
        color: 'gray'

    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 33,
        marginTop: '90%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        // position:'absolute',
        // bottom:0,
        // shadowColor: '#000',
        // shadowOpacity: 0.2,
        // shadowOffset: { width: 0, height: 2 },
        // shadowRadius: 4,
        // elevation: 5,//shedow
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 20,
        borderRadius: 10,
    },
    btnRound: {
        position: 'absolute',
        right: 5, // Position the circle at the end
        width: 48,
        height: 48,
        borderRadius: 24, // Make it a perfect circle
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
})