import { StyleSheet, Text, View ,ScrollView,TouchableOpacity,Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const EditProfile = ({route}) => {
    const[editprofileData,seteditprofileData] = useState({})
    const navigation = useNavigation();
    useEffect(()=>{
        const {profileDataEdt} = route?.params;
        // console.log('profileDataEdt',profileDataEdt)
        seteditprofileData(profileDataEdt);
    },[])
console.log(editprofileData)
  return (
    <ScrollView
          style={{
            backgroundColor: 'rgba(245, 249, 255, 1)', paddingHorizontal: 20,
            flex: 1,
          }}>
         {/* ---------BackHeader------- */}
              <View style={{ marginTop: 20, flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                >
                  <AntDesign name='arrowleft' size={25} color={'black'} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15 }}>EditProfile</Text>
              </View>

          {/* ---------images--- */}
              <View style={{ alignSelf: 'center',marginTop:20}}>
                <Image
                    source={{ uri: editprofileData.avatar }}
                    style={{
                    height: 101,
                    width: 101,
                    borderWidth: 3,
                    borderColor: 'rgba(22, 127, 113, 1)',
                    borderRadius: 999,
                          }}
                    resizeMode="contain"
                />
              </View>

              {/* Input controll */}
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

    </ScrollView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
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
})