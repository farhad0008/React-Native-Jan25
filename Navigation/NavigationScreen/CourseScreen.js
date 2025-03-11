import { FlatList, StyleSheet, Text, View ,TouchableOpacity,Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
const CourseScreen = () => {
    const [courses, setCourses] = useState([])

    const focus= useIsFocused();
    const navigation=useNavigation();

    const getCourses = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken')
            // console.log(token)
            const response = await fetch('https://test.moprep.in/api/v2/courseMasterList', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            const data = await response.json()
            setCourses(data.result)
            console.log(data.result)
        } catch (e) {
            console.error("getCoursesError", e)
        }
    }
    useEffect(() => {
        getCourses();
    }, [focus])
    return (
        <View style={{paddingHorizontal:20}}>
            <FlatList
                data={courses}
                renderItem={({item,index}) => <View style={styles.shadowContainer}>
                        <TouchableOpacity
                            onPress={ async () =>{
                                await AsyncStorage.setItem('course_id',item?.course_master_id?.toString()                            )
                                navigation.navigate('BottomTabBar')
                            }
                            }
                            key={index}
                        >
                            <View style={styles.renderContaner}>
                                <View style={{ flexDirection: 'row' }}>
                                <Image source={{ uri: item?.image }} style={styles.image} />

                                    <View style={{ marginLeft: 5, marginTop: 5 }}>
                                        <Text style={{ fontWeight: 'bold',fontSize:20 }}>{item.name}</Text>
                                        <Text>{item.description}</Text>
                                    </View>
                                </View>

                                <View>
                                    {item.status ? (
                                        <Ionicons name="checkmark-circle" size={25} style={{ paddingRight: 16 }} color={'green'} />
                                    ) : null}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    )
}

export default CourseScreen

const styles = StyleSheet.create({
    shadowContainer: {
        backgroundColor: 'rgba(245, 249, 255, 1)',
        borderRadius: 10,
        // padding: 10,
        // marginVertical: 10,
        elevation: 10, //shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        // paddingVertical: 10,
        // paddingHorizontal: 10,
        marginTop: 20
    },
    renderContaner: {
        justifyContent: 'space-between', padding: 20, flexDirection: 'row', alignItems: 'center'
    },
    chapterSequence: {
        height: 50, width: 50, borderRadius: 25, borderWidth: 1.5, borderColor: 'rgb(202, 219, 247)',
         backgroundColor: 'rgb(219, 228, 243)', justifyContent: 'center', alignItems: 'center'
    },
    image:{
            height:60,width:60,borderRadius:30,alignSelf:'center'
    }
})