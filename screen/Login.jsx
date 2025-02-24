import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const Login = () => {
    const [userName, setusername] = useState("")
    const [password, setpassword] = useState("")
 
  const navigation=  useNavigation()
    const handleLogin = async () => {
        try{
            const response = await fetch("https://dummyjson.com/auth/login", {
                method:'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: userName,
                    password: password
                })
            })
            console.log(response.ok) 
            if(response.ok){
                const ret=await response.json()
                // console.log(ret)
                await AsyncStorage.setItem("userToken",JSON.stringify(ret))    
                navigation.navigate("ProductList")
            }else{
                Alert.alert("Login Faild:","Invalid user name and PassWord")
            }
        }catch(e){
            console.log("handlLogin Error",e)
        }
        
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput style={styles.input} placeholder="UserName" value={userName} onChangeText={(val) => setusername(val)} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={(val) => setpassword(val)} />
            <Button title="Login" onPress={handleLogin} />
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: { padding: 20, flexGrow: 1, justifyContent: "center", backgroundColor: "#f9f9f9" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 5 },
    input: { backgroundColor: "#fff", padding: 10, marginVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#ccc" },
})