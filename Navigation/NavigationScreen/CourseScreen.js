import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CourseScreen = () => {
    const[courses,setCourses] = useState([])
    const getCourses = async () => {
        try{
            const token = await AsyncStorage.getItem('userToken')
            const response = await fetch('https://test.moprep.in/api/v2/courseMasterList',{
                method:'POST',
                headers:{
                    Authorization: `Bearer ${token}`,
                }

            })
            const data= await response.json()
            setCourses(data.result)
            // console.log(data)
        }catch(e){
            console.error("getCoursesError",e)
        }
    }
    useEffect(()=>{
        getCourses();
    },[])
  return (
    <View>
      <Text>CourseScreen</Text>
    </View>
  )
}

export default CourseScreen

const styles = StyleSheet.create({})