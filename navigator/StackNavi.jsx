//https://reactnavigation.org/docs/stack-navigator
import { StyleSheet, Text, View ,Button} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screen/Home';
import Article from '../screen/Article';
import About from '../screen/About';
import SignUp from '../screen/SignUp';

const StackNavi = () => {
  const Stack = createNativeStackNavigator();
  return (
      <Stack.Navigator initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: 'skyblue' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
      >
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='About' component={About} 
          options={{
          title: 'My Custom Title Home',
          headerStyle: { backgroundColor: 'tomato'},
          headerTintColor: 'white', //text color
          headerRight: () => (
            <Button onPress={() => alert('This is a button!')} title='info->'/>
          ),
        }}
        />
        <Stack.Screen name='Article' component={Article} />
        <Stack.Screen name='SignUp' component={SignUp} />
      </Stack.Navigator>
  )
}

export default StackNavi

// const styles = StyleSheet.create({})