import { StyleSheet, Text, View ,Button,ScrollView} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Article from './Article.jsx';
import Home from './Home';
import { SafeAreaView } from 'react-native-safe-area-context';

const About = () => {
  const navigation=useNavigation();
  return (
    <SafeAreaView>
      <ScrollView>

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    < Text>About</Text>
      <View style={{ marginTop: 15,width:'50%' }}><Button title='About' onPress={() => navigation.navigate(About)} /></View>
      <View style={{ marginTop: 15,width:'50%' }}><Button title='Article' onPress={() => navigation.navigate(Article)} /></View>
      <View style={{ marginTop: 15,width:'50%' }}><Button title='TopTabNavi' onPress={() => navigation.navigate('TopTabNavi')} /></View>
      <View style={{ marginTop: 15,width:'50%' }}><Button title='StackNavi' onPress={() => navigation.navigate('StackNavi')} /></View>
      <View style={{ marginTop: 15,width:'50%' }}><Button title='BottomTabNavi' onPress={() => navigation.navigate('BottomTabNavi')} /></View>
    </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default About

// const styles = StyleSheet.create({})