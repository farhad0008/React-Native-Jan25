import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppImages } from '../assets/images'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { RegisterFormData, stateData } from '../reduxToolkit/slice/regiisterSliceThunk';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';

const RegisterMoprep = () => {
    const [shownPass, setShownPass] = useState(true)
    const [shownConfPass, setShownConfPass] = useState(true)
    const [isFocus, setIsFocus] = useState(false);
    const [valueData, setValue] = useState(null);
    const [stateList, setStateList] = useState([])
    const [form, setForm] = useState({
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        name: '',
        college: '',
        state: ''
    });

    const validation = () => {
        // let valid = true;
        if (form.email === '' || form.mobile === '' || form.password === '' || form.confirmPassword === '' || form.name === '' || form.college === '') {
            Alert.alert("Blank Field","Please fill the blank field")
            return false;
        }
        if(form.mobile.length !== 10){
            Alert.alert("Invalid Input","Mobile Number must be 10 digit")
            return false;
        }
        if(form.password.length<6 || form.confirmPassword.length<6){
            Alert.alert("Invalid Input","Password Atleast 6 charecter")
        }
        if(form.password !== form.confirmPassword){
            Alert.alert("Invalid Input","Mis match Password or conFirmPassword is different")
        }
        return true;
    }

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const getStateData = async () => {
        const response = await dispatch(stateData()).unwrap();
        setStateList(response.result)
        // console.log("stateDataList",response.result)
    }

    const handleRegister = () => {
        if (!validation()) {
            return;
        }
    
         const response= dispatch(RegisterFormData({
            name: form.name,
            email: form.email,
            mobile: form.mobile,
            password: form.password,
            confirm_password: form.confirmPassword,
            college: form.college,
            state: form.state,
            firebase_token :'dDMGlzxRWmoKlS35__AQB:APA91bENZ1PlFK30_ZqUsi4ojBbRs7rw0ocwVPnTky0CgdP0bNLH3YL12_J_43Qk_s4leJJR_JNg6VAsB8XTf9Z3i351XWKoaWOKg9u1Obx0-8YHwutY'
          })).unwrap();
          Alert.alert('Register',"succesfully Registered..")
        // console.log("response register",response)
    }

    useEffect(() => {
        getStateData()
    }, [])
    return (
        <ScrollView>

        
        <View style={styles.container}>

            <View style={styles.appLogoContainer}>
                <Image source={AppImages.LOGO} />
                <Text style={styles.logoText}>MOprep</Text>
            </View>

            <View style={styles.discription}>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Let's Register.!</Text>
                <Text style={{ fontWeight: 'bold', color: 'gray' }}>Register Your Account to Continue your Courses</Text>
            </View>

            {/* Input controll */}
            <View style={styles.inputContainer}>
                <View style={styles.inputParent}>
                    <Feather name={'mail'} size={22} color={'gray'} />
                    <TextInput
                        style={[styles.input]}
                        placeholder="Email ID"
                        keyboardType="email-address"  // Ensures proper keyboard layout
                        autoCapitalize="none"  // Prevents automatic capitalization
                        autoCorrect={true}  // Disables auto-correct
                        value={form.email}
                        onChangeText={(val) => setForm({ ...form, email: val })}
                    />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.inputParent}>
                    <FontAwesome name={'mobile'} size={22} color={'grey'} />
                    <TextInput
                        style={[styles.input]}
                        placeholder="Mobile no."
                        // secureTextEntry={shownPass}
                        keyboardType='phone-pad'
                        maxLength={10}
                        value={form.mobile}
                        onChangeText={(val) => setForm({ ...form, mobile: val })}
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
                    <FontAwesome name={'lock'} size={22} color={'grey'} />
                    <TextInput
                        style={[styles.input]}
                        placeholder="Password"
                        secureTextEntry={shownPass}
                        value={form.password}
                        onChangeText={(val) => setForm({ ...form, password: val })}
                    />
                    <TouchableOpacity
                        onPress={() => setShownPass(!shownPass)}
                    >
                        <Feather name={shownPass ? 'eye-off' : 'eye'} size={22} color={'gray'} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.inputParent}>
                    <FontAwesome name={'lock'} size={22} color={'grey'} />
                    <TextInput
                        style={[styles.input]}
                        placeholder="Confirm Password"
                        secureTextEntry={shownConfPass}
                        value={form.confirmPassword}
                        onChangeText={(val) => setForm({ ...form, confirmPassword: val })}
                    />
                    <TouchableOpacity
                        onPress={() => setShownConfPass(!shownConfPass)}
                    >
                        <Feather name={shownConfPass ? 'eye-off' : 'eye'} size={22} color={'gray'} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.inputParent}>
                    <FontAwesome name={'user'} size={22} color={'grey'} />
                    <TextInput
                        style={[styles.input]}
                        placeholder="Name"
                        // secureTextEntry={shownPass}
                        value={form.name}
                        onChangeText={(val) => setForm({ ...form, name: val })}
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
                    <FontAwesome5 name={'university'} size={22} color={'grey'} />
                    <TextInput
                        style={[styles.input]}
                        placeholder="Collage Name"
                        // secureTextEntry={shownPass}
                        value={form.college}
                        onChangeText={(val) => setForm({ ...form, college: val })}
                    />
                    <TouchableOpacity
                    // onPress={() => setShownPass(!shownPass)}
                    >
                        {/* <Feather name={shownPass ? 'eye-off' : 'eye'} size={22} color={'gray'} /> */}
                        <Text>optional</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={stateList}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select item"
                searchPlaceholder="Search..."
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                value={valueData}
                onChange={item => {
                    setValue(item.id);
                    setForm({ ...form, state: item.label });
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                )}
            />



            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
                <View style={styles.btnRound}>
                    <Feather name={'arrow-right'} size={25} color={'black'} />
                </View>
            </TouchableOpacity>

            {/* SignUp Link */}
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <TouchableOpacity style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'gray', fontWeight: 'bold' }}>Already have an Account?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={{ color: '#007BFF' }}>LOGIN</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>

        </View>
        </ScrollView>
    )
}

export default RegisterMoprep

const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        // justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    appLogoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 20,

    },
    logoText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        marginHorizontal: 8,
    },
    discription: {
        marginTop: 15
    },
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
        fontFamily: 'bold',

    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 33,
        marginTop: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
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
    dropdown: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginVertical: 7,
    },
    placeholderStyle: {
        color: 'gray'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    icon: {
        marginRight: 8,
    },
})