import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { loginPost } from '../reduxToolkit/slice/loginSliceThunk';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AppImages } from '../assets/images';



const Login = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ mobile: '', password: '' });
    const [shownPass, setShownPass] = useState(true)

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const validateForm = () => {
        let valid = true;
        let newErrors = { mobile: '', password: '' };

        // 📞 Mobile validation: 10 digits, starts with 6-9
        if (!/^[6-9]\d{9}$/.test(mobile)) {
            newErrors.mobile = 'Enter a valid 10-digit mobile number';
            valid = false;
        }

        // 🔑 Password validation: min 6 characters
        if (password.trim().length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        try {
            const response = await dispatch(
                loginPost({
                    mobile,
                    password,
                    firebase_token: 'dDMGlzxRWmoKlS35__AQB:APA91bENZ1PlFK30_ZqUsi4ojBbRs7rw0ocwVPnTky0CgdP0bNLH3YL12_J_43Qk_s4leJJR_JNg6VAsB8XTf9Z3i351XWKoaWOKg9u1Obx0-8YHwutY',
                })
            ).unwrap();

            console.log('Response:', response);
            if (response?.token) {
                await AsyncStorage.setItem('userToken', JSON.stringify(response.token));
                await AsyncStorage.setItem('userDetail', JSON.stringify(response));
                Alert.alert('✅ Success', 'Login successful!');
                navigation.navigate('ProductList');
            } else {
                Alert.alert('❌ Login Failed', response?.message || 'Invalid credentials');
            }
        } catch (e) {
            console.error('Login Error:', e);
            Alert.alert('❌ Error', 'Something went wrong. Please try again.');
        }
    };

    return (
        <ScrollView>
        <View style={styles.container}>
            {/* App Logo */}
            <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row',marginBottom:100}}>
                <Image source={AppImages.LOGO} />
                <View style={{}}>
                    <Text style={{fontFamily:'Jost-Bold',fontSize: 28,marginHorizontal: 10,color:'rgba(32, 34, 68, 1)',fontWeight:'bold'}}>MOprep</Text>
                </View>
            </View>

            <View style={{marginBottom:35}}>
                <Text style={{fontWeight:'bold',fontSize:22}}>Let's Log In...!</Text>
                <Text style={{color:'gray',fontWeight:'bold',marginTop:8}}>Login to Your Account to Continue your Courses</Text>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.inputParent}>
                    <FontAwesome name={'mobile'} size={25} color={'grey'} />
                    <TextInput
                        style={[styles.input, errors.mobile && styles.errorInput]}
                        placeholder="Mobile"
                        keyboardType="phone-pad"
                        maxLength={10}
                        value={mobile}
                        onChangeText={setMobile}
                    />
                </View>
            </View>
            {errors.mobile ? <Text style={styles.errorText}>{errors.mobile}</Text> : null}
            <View style={styles.inputContainer}>
                <View style={styles.inputParent}>
                    <FontAwesome name={'lock'} size={22} color={'grey'} />
                    <TextInput
                        style={[styles.input, errors.password && styles.errorInput]}
                        placeholder="Password"
                        secureTextEntry={shownPass}
                        value={password}
                        onChangeText={setPassword}

                    />
                    <TouchableOpacity
                        onPress={() => setShownPass(!shownPass)}
                    >
                        <Feather name={shownPass ? 'eye-off' : 'eye'} size={22} color={'gray'} />
                    </TouchableOpacity>
                </View>
            </View>
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            {/* forget password */}
            <View style={{ flexDirection: 'row', marginBottom: 30, marginTop: 10 }}>
                <TouchableOpacity style={{ position: 'absolute', right: 5 }}>
                    <Text>Forgot PassWord?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
                <View style={styles.btnRound}>
                    <Feather name={'arrow-right'} size={25} color={'black'} />
                </View>
            </TouchableOpacity>

            {/* SignUp Link */}
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 70 }}>
                <TouchableOpacity style={{flexDirection:'row'}}>
                    <Text style={{color:'gray',fontWeight:'bold'}}>Don't have an Account?</Text>
                    <TouchableOpacity
                        onPress={()=>navigation.navigate('RegisterMoprep')}
                    >
                        <Text style={{color:'#007BFF'}}>SIGN UP</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
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
        marginVertical: 6,
        flex: 1,
    },
    input: {
        padding: 0,
        flex: 1,
        marginHorizontal: 10,
        fontFamily: 'bold',

    },

    errorInput: {
        borderColor: '#ff4d4d',
    },
    errorText: {
        color: '#ff4d4d',
        fontSize: 12,
        marginBottom: 4,
        marginLeft: 4,
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
});
