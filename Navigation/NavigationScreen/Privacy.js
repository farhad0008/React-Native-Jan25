import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import WebView from 'react-native-webview';


const Privacy = () => {
    const [sourceLink, setSourceLink] = useState('')

    const getPrivacyData = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken')
            const response = await fetch('https://test.moprep.in/api/privacyPolicy', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json();
            console.log(data)
            setSourceLink(data?.privacy);
        } catch (e) {
            console.error('getPrivacyData', e)
        }
    }
    console.log(sourceLink)
    useEffect(() => {
        getPrivacyData();
    }, [])
    return (
        <View style={{flex: 1, marginHorizontal: 10}}>
      {!!sourceLink && <WebView source={{uri: sourceLink}} style={{flex: 1}} />}
    </View>
    )
}

export default Privacy

const styles = StyleSheet.create({})