import {
  StyleSheet, Text, View, Image,
  ScrollView, RefreshControl, TouchableOpacity, TextInput, ActivityIndicator,FlatList
} from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';

const QuestionBank = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [userToken, setUserToken] = useState('')
  const [chapterData, SetchapterData] = useState([]);
  const [unComQueBan, setUnComQueBan] = useState([]);

  const navigation = useNavigation();

  const chapterDataFunc = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setUserToken(token);
    try {
      const response = await fetch('https://test.moprep.in/api/chapterQuestionBank', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', // Important for JSON data
        },
        body: JSON.stringify({ subject_id: unComQueBan.id }) // Convert object to JSON string
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const result = await response.json(); // Convert response to JSON
      SetchapterData(result.result);
      console.log('Response Data:', result.result);

      return result;
    } catch (error) {
      console.error('chapterDataFunc Error:', error);
    }
  };

  const searchFunc = async () => {
    // const token = AsyncStorage.getItem('userToken');
    try {
      const response = await fetch('https://test.moprep.in/api/v2/questionBankSearch',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json', // Important for JSON data
          },
          body: JSON.stringify({
            title: searchText,
            subject_id: unComQueBan?.id,
            course_master_id: 1
          })
        }
      )
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const result = await response.json(); // Convert response to JSON
      SetsearchTopics(result.result)
      console.log('searchFunc Data:', result.result);
      // console.log('searchFunc Data:',response );


    } catch (e) {
      console.error("searchFuncError", e)
    }
  }

  const uncompletedQuestionBank = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setUserToken(token);
    try {
      const response = await fetch('https://test.moprep.in/api/v2/uncompletedQuestionBank?course_master_id=1',
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      const data = await response.json();
      setUnComQueBan(data.result);
      // console.log('uncompletedQuestionBank', data);
    } catch (error) {
      console.error("Error fetching question banks:", error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    uncompletedQuestionBank()
    // chapterDataFunc()
    setRefreshing(false);
  };
  useEffect(() => {
    setRefreshing(true);
    uncompletedQuestionBank()
    // chapterDataFunc()
    setRefreshing(false);
  }, [])
  return (
    <ScrollView
      style={{
        backgroundColor: 'rgba(245, 249, 255, 1)', paddingHorizontal: 20,
        flex: 1,
      }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
    >
      {/* BackHeader */}
      <View style={{ marginTop: 20, }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <AntDesign name='arrowleft' size={25} color={'black'} />
        </TouchableOpacity>
      </View>
      {/* Search bar with shedow container */}
      <View style={styles.shadowContainer}>
        <View style={styles.rowContainer}>
          <TextInput
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            placeholder='Search for Questions & Topic'
            style={{
              flex: 1,
              fontSize: 16,
              fontFamily: 'Mulish-Bold',
              color: 'black',
            }}
          />
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(9, 97, 245, 1)',
              borderRadius: 8,
              padding: 10,
            }}
            onPress={searchFunc}
          >
            <Feather name='search' fontSize={20} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 15 }}>Subjects</Text>

      {/* Question List */}

      {unComQueBan.length ? (
        <FlatList
          scrollEnabled={false}
          data={unComQueBan}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={[{ flexDirection: 'row', alignItems: 'center', padding: 10, marginHorizontal: 3, marginBottom: 10 }, styles.shadowContainer]}
              // onPress={()=>QueBankOnPress(item)}
              onPress={async () => {
                // await AsyncStorage.setItem('storeData',JSON.stringify(item))
                navigation.navigate('ChapterScreen', { data: item })
              }
              }
              key={index}
            >
              <Image source={{ uri: item.image }} style={{ height: 60, width: 60,  marginRight: 10,marginLeft:10 }} />
              <View style={{ flex: 1 ,marginLeft:20}}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
               <View style={{marginTop:5}}>
                  <Progress.Bar
                    progress={1 - item.left_questions / item.total_questions}
                    width={200}
                    color={'rgba(9, 97, 245, 0.45)'}
                    borderColor={'rgb(200, 219, 250)'}
                  />
                  </View>
                  <Text style={{ marginLeft: 1, fontWeight: 'bold', fontSize: 13,marginTop:5 }}>{item.completed_questions}/{item.total_questions} complated Question</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <ActivityIndicator />
      )}

    </ScrollView>
  )
}

export default QuestionBank

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
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 10
  },
  rowContainer:
  {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  }
})