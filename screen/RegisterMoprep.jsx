import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { AppImages } from '../assets/images';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const RegisterMoprep = () => {
    const [form, setForm] = useState({
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        name: '',
        college: '',
        country: ''
    });
    const [shownPass, setShownPass] = useState(true);
    const [shownConfPass, setShownConfPass] = useState(true);
    const navigation = useNavigation();

    const handleInputChange = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const validateForm = () => {
        const { email, mobile, password, confirmPassword, name } = form;

        if (!email || !mobile || !password || !confirmPassword || !name) {
            Alert.alert("Error", "All fields except College and Country are required");
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Error", "Enter a valid email");
            return false;
        }

        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(mobile)) {
            Alert.alert("Error", "Enter a valid 10-digit mobile number");
            return false;
        }

        if (password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters long");
            return false;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return false;
        }

        return true;
    };

    const handleRegister = () => {
        if (validateForm()) {
            Alert.alert("Success", "Registration Successful!");
            // Handle registration logic
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.appLogoContainer}>
                <Image source={AppImages.LOGO} />
                <Text style={styles.logoText}>MOprep</Text>
            </View>
            <View style={styles.description}>
                <Text style={styles.title}>Let's Register!</Text>
                <Text style={styles.subtitle}>Register Your Account to Continue your Courses</Text>
            </View>
            {[
                { key: 'email', icon: 'mail', placeholder: 'Email ID', type: 'email' },
                { key: 'mobile', icon: 'mobile', placeholder: 'Mobile No.', type: 'numeric' },
                { key: 'password', icon: 'lock', placeholder: 'Password', secure: shownPass, toggle: () => setShownPass(!shownPass) },
                { key: 'confirmPassword', icon: 'lock', placeholder: 'Confirm Password', secure: shownConfPass, toggle: () => setShownConfPass(!shownConfPass) },
                { key: 'name', icon: 'user', placeholder: 'Name' },
                { key: 'college', icon: 'university', placeholder: 'College Name (Optional)' },
                { key: 'country', icon: 'globe', placeholder: 'Country (Optional)' }
            ].map(({ key, icon, placeholder, secure, toggle, type = 'default' }) => (
                <View style={styles.inputContainer} key={key}>
                    <FontAwesome name={icon} size={22} color={'gray'} />
                    <TextInput
                        style={styles.input}
                        placeholder={placeholder}
                        secureTextEntry={secure}
                        keyboardType={type}
                        onChangeText={(value) => handleInputChange(key, value)}
                    />
                    {toggle && (
                        <TouchableOpacity onPress={toggle}>
                            <Feather name={secure ? 'eye-off' : 'eye'} size={22} color={'gray'} />
                        </TouchableOpacity>
                    )}
                </View>
            ))}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
                <View style={styles.btnRound}>
                    <Feather name={'arrow-right'} size={25} color={'black'} />
                </View>
            </TouchableOpacity>
            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an Account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginLink}> LOGIN</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RegisterMoprep;

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, backgroundColor: '#f9f9f9' },
    appLogoContainer: { justifyContent: 'center', alignItems: 'center', flexDirection: 'row', margin: 20 },
    logoText: { fontSize: 28, fontWeight: 'bold', color: 'black', marginHorizontal: 8 },
    description: { marginTop: 15 },
    title: { fontSize: 25, fontWeight: 'bold' },
    subtitle: { fontWeight: 'bold', color: 'gray' },
    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 10, borderRadius: 10, marginVertical: 7 },
    input: { flex: 1, marginHorizontal: 10 },
    button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 33, marginTop: 15, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
    buttonText: { color: '#fff', fontWeight: '600', fontSize: 20 },
    btnRound: { position: 'absolute', right: 5, width: 48, height: 48, borderRadius: 24, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
    loginContainer: { justifyContent: 'center', alignItems: 'center', marginTop: 10, flexDirection: 'row' },
    loginText: { color: 'gray', fontWeight: 'bold' },
    loginLink: { color: '#007BFF', fontWeight: 'bold' }
});
