import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppImages } from '../../assets/images';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ContactUs = () => {
  const [contactDetails, setContactDetails] = useState(null);
  const focus = useIsFocused();

  const getContactDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch('https://test.moprep.in/api/contactUs', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setContactDetails(data);
    } catch (e) {
      console.error('getContactDetails error:', e);
    }
  };

  console.log(contactDetails?.result);

  useEffect(() => {
    if (focus) {
      getContactDetails();
    }
  }, [focus]);

  return (
    <ScrollView style={{ paddingHorizontal: 20 }}>
      <View style={styles.shadowContainer}>
        <Image source={AppImages.CONTACT_US} style={{ alignSelf: 'center' }} />

        <TouchableOpacity style={styles.contectRow}
        onPress={()=>Linking.openURL(`mailto:${contactDetails?.email}`)}
        >
          <Entypo name="mail" size={25} />
          <Text style={styles.contactText}>{contactDetails?.email}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.contectRow}
        onPress={()=>Linking.openURL(`mailto:support@moprep.in`)}
        >
          <Entypo name="mail" size={25} />
          <Text style={styles.contactText}>support@moprep.in</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.contectRow}
        onPress={()=>Linking.openURL(`https://t.me/upsc_cms_app`)}

        >
          <FontAwesome name="telegram" size={25} />
          <Text style={styles.contactText}>{contactDetails?.telegram}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.contectRow}
         onPress={()=>Linking.openURL('https://www.instagram.com/moprep_upsc_cms?igsh=MWxuNW44YnhwNDFybA==')}

        >
          <Entypo name="instagram" size={25} />
          <Text style={styles.contactText}>Follow us on Instagram</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 15 }}>FAQs</Text>
      {contactDetails?.result?.map((item, index) => (
        <View key={index} style={{marginTop:10,borderBottomWidth:1,borderBottomColor:'rgb(200, 202, 206)',paddingVertical:20}}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{fontWeight:'bold'}}>{`(${index + 1})`}</Text>
            <Text style={{fontWeight:'bold',paddingLeft:'5'}}>Que.{item.title}</Text>
          </View>
          <View style={{marginLeft:22}}>
            <Text>Ans. {item.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  shadowContainer: {
    backgroundColor: 'rgba(245, 249, 255, 1)',
    borderRadius: 20,
    marginVertical: 10,
    elevation: 10, // shadow
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.25,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: 25,
  },
  contactText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'rgba(61, 61, 61, 0.23)',
  },
  contectRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 13,
  },
});
