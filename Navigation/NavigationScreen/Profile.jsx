import { StyleSheet, Text, View, ScrollView, RefreshControl, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Entypo from 'react-native-vector-icons/Entypo';


const Profile = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [userToken, setUserToken] = useState('')
  const [profileData, setprofileData] = useState([]);

  const focus = useIsFocused()
  const navigation = useNavigation()

  const ProfileDetails = async () => {
    const token = await AsyncStorage.getItem('userToken');
    // setUserToken(token)
    try {
      const response = await fetch('https://test.moprep.in/api/userProfile',
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      const data = await response.json();
      setprofileData(data.result);
      // console.log('ProfileDetails', data);
    } catch (e) {
      console.error('ProfileDetailsError', e)
    }
  }

  useEffect(() => {
    ProfileDetails();
  }, [focus])
  
  useEffect(() => {
    ProfileDetails();
  }, [])

  const handleRefresh = () => {
    setRefreshing(true)
    ProfileDetails();
    console.log(profileData)
    setRefreshing(false)
  }
  return (
    <ScrollView
      style={{
        backgroundColor: 'rgba(245, 249, 255, 1)', paddingHorizontal: 20,
        flex: 1,
      }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
    >
      {/* BackHeader */}
      <View style={{ marginTop: 20, flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <AntDesign name='arrowleft' size={25} color={'black'} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15 }}>Profile</Text>
      </View>

      {/* shadow container */}
      <View style={styles.shadowContainer}>
        <View style={{ alignSelf: 'center',  position: 'absolute', top: -50, }}>
          <Image
            source={{ uri: profileData.avatar }}
            style={{
              height: 90,
              width: 90,
              borderWidth: 3,
              borderColor: 'rgba(22, 127, 113, 1)',
              borderRadius: 999,
            }}
            resizeMode="contain"
          />
        </View>

        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{profileData.name}</Text>
          <Text style={{ color: 'gray' }}>{profileData.email}</Text>
        </View>

        {/* list of functionality */}
        <TouchableOpacity
        onPress={()=>navigation.navigate('EditProfile',{profileDataEdt:profileData})}
        style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:20 }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Feather name={'user'} size={22} color={'black'} />
            <Text style={{textAlign:'center', fontSize:15,fontWeight:'bold'}}>Edit Profile</Text>
          </View>
          <Entypo name={'chevron-right'}size={20}color={'black'}/>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:20 }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Feather name={'bell'} size={22} color={'black'} />
            <Text style={{textAlign:'center', fontSize:15,fontWeight:'bold'}}>Notifications</Text>
          </View>
          <Entypo name={'chevron-right'}size={20}color={'black'}/>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:20 }}
        onPress={()=>navigation.navigate('CourseScreen',{profileDataEdt:profileData})}
        >
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Feather name={'book'} size={22} color={'black'} />
            <Text style={{textAlign:'center', fontSize:15,fontWeight:'bold'}}>Change Course</Text>
          </View>
          <Entypo name={'chevron-right'}size={20}color={'black'}/>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:20 }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Feather name={'bookmark'} size={22} color={'black'} />
            <Text style={{textAlign:'center', fontSize:15,fontWeight:'bold'}}>Bookmark</Text>
          </View>
          <Entypo name={'chevron-right'}size={20}color={'black'}/>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:20 }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Feather name={'mail'} size={22} color={'black'} />
            <Text style={{textAlign:'center', fontSize:15,fontWeight:'bold'}}>Subscription</Text>
          </View>
          <Entypo name={'chevron-right'}size={20}color={'black'}/>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:20 }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <AntDesign name={'wallet'} size={22} color={'black'} />
            <Text style={{textAlign:'center', fontSize:15,fontWeight:'bold'}}>Transaction</Text>
          </View>
          <Entypo name={'chevron-right'}size={20}color={'black'}/>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:20 }}
                onPress={()=>navigation.navigate('ContactUs')}

        >
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Feather name={'phone-call'} size={22} color={'black'} />
            <Text style={{textAlign:'center', fontSize:15,fontWeight:'bold'}}>Contact Us</Text>
          </View>
          <Entypo name={'chevron-right'}size={20}color={'black'}/>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:20 }}
        onPress={()=>navigation.navigate('Privacy')}
        >
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Feather name={'file-text'} size={22} color={'black'} />
            <Text style={{textAlign:'center', fontSize:15,fontWeight:'bold'}}>T&C,Refund and Privacy policy</Text>
          </View>
          <Entypo name={'chevron-right'}size={20}color={'black'}/>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:20 }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Feather name={'trash'} size={22} color={'black'} />
            <Text style={{textAlign:'center', fontSize:15,fontWeight:'bold'}}>Reset Account</Text>
          </View>
          <Entypo name={'chevron-right'}size={20}color={'black'}/>
        </TouchableOpacity>

      {
        Platform.OS == 'android'? ( <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:20 }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Feather name={'star'} size={22} color={'black'} />
             <Text style={{textAlign:'center', fontSize:15,fontWeight:'bold'}}>Rate Us</Text>
            </View>
           <Entypo name={'chevron-right'}size={20}color={'black'}/>
          </TouchableOpacity>
            ):null
      }
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:20 }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Feather name={'log-out'} size={22} color={'black'} />
            <Text style={{textAlign:'center', fontSize:15,fontWeight:'bold'}}>logout</Text>
          </View>
          <Entypo name={'chevron-right'}size={20}color={'black'}/>
        </TouchableOpacity>

      </View>
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({

  shadowContainer: {
    backgroundColor: 'rgba(245, 249, 255, 1)',
    borderRadius: 20,
    // padding: 10,
    marginVertical: 10,
    elevation: 10, //shadow
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.25,
    // shadowRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: 25
  },
})