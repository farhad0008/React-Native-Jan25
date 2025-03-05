import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform, Share, TextInput, RefreshControl, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { ActivityIndicator } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
const ChapterScreen = ({ route }) => {
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiODAzOGQyODNhMjgyOWM0ZWI3ZTEwMmQ3NDdmMmUyNGNkMWQ4ODlhNWE4ZjdmOThkN2MxYzMyODdkNTk1ZGFiMDQwZTM1MGU1NjEzOWU5MmMiLCJpYXQiOjE3NDA3MjcyOTEsIm5iZiI6MTc0MDcyNzI5MSwiZXhwIjoxNzcyMjYzMjkxLCJzdWIiOiIzMzQxIiwic2NvcGVzIjpbXX0.sd5wX_A4KG9mnoBOH9_8jZfBTWHT_XnqAMeaLvUaOyNls-pkAxIa7G_TjfoYtlOayXM6ExIPIioDnl8A0Sm19WYPCsNzYNGPT-3sFRoX0DWLbM6whwmh2Yon5-sQCHv0VsDCbdJBNuBZ_bO1mJFDSPcY1gbAXRc2_aJIhemFW7eQZfuyFYVM7CmYHBDF9Ke3j_OQOM0hJl_vdA14NKfM95Uv-7i-AlzD584k2iNg7BV4joLqeAyYv65icRbEYKcR78pVkEyGKsUwJrSKeRjIbKATRCdMVEwNVk6f_Srx1rOgnrQqbHfarAwKFxFW_mBsSCdV7_6yryO95ea2FiyDjEU6kwDZ7_XzXA18W1TLYbEm1NdyZU57i9PmVQZgi0pHP8dlcQLHTGzvjv5N_ihI1JgJ4rgF27w9jZ0id9zOUQjG27nmwGQBn_IrxVllkNqn1YrnQIamFpeOmlaazxfqCS-i7DcLD0HOPB-kgu7L6AtbaAaGcE3SdMA5TK_TUJUAXX6a-hjU4_d8J5UBpS5dXxQONhgH61hAICqWvJk772QTJ9FnEA--MMaEu5OqwFxqze9051cza6BnQiZ-PcD9hR7MMg87J6kw1XwmzI_F9w_PiBFMYdVRHb1YoCVDGd0K4TzkRi8XLWqym3LqzWX_rv4VBhteb_14aMOMBOVXQos"; // Replace with actual token
    const [searchText, setSearchText] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    const [chapterData, SetchapterData] = useState([]);
    const [searchTopics, SetsearchTopics] = useState([]);


    const { data } = route.params || {};
    const navigation = useNavigation();
    console.log(data)

    const onShare = async () => {
        const url = Platform.OS == 'android' ? 'https://play.google.com/store/apps/details?id=com.moprep&pli=1' : 'https://apps.apple.com/us/app/moprep-upsc-cms/id6502982709';
        try {
            const result = await Share.share({
                title: 'App link',
                message:
                    `Please install this app and stay safe , AppLink :${url}`,
                url: url,
            })
            // console.log(result)
        } catch (e) {
            console.error("shere", e)
        }
    }

    const chapterDataFunc = async () => {
        try {
            const response = await fetch('https://test.moprep.in/api/chapterQuestionBank', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', // Important for JSON data
                },
                body: JSON.stringify({ subject_id: data.id }) // Convert object to JSON string
            });

            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            const result = await response.json(); // Convert response to JSON
            SetchapterData(result.result);
            // console.log('Response Data:', result.result);

            return result;
        } catch (error) {
            console.error('chapterDataFunc Error:', error);
        }
    };

    const searchFunc=async()=>{
        try{
            const response = await fetch('https://test.moprep.in/api/v2/questionBankSearch',
                {
                    method:'POST',
                    headers:{
                        'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', // Important for JSON data
                    },
                    body:JSON.stringify({
                        title: searchText,
                        subject_id: data?.id ,
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
            

        }catch(e){
            console.error("searchFuncError",e)
        }
    }

    useEffect(() => {
        if (searchText.length >= 3) {
          SetsearchTopics([]);
          searchFunc();
        } else {
          SetsearchTopics([]);
        }
      }, [searchText]);


    const handleRefresh = async () => {
        setRefreshing(true);
        chapterDataFunc();
        setRefreshing(false);
    };
    useEffect(() => {
        setRefreshing(true);
        chapterDataFunc();
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
            <View style={styles.backHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <AntDesign name='arrowleft' size={25} color={'black'} />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10, marginTop: -5 }}>{data.name}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        onShare();
                    }}>
                    <MaterialIcons name="share" size={25} color={'gray'} />
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

            {/* search data display */}
            {
                searchText.length >=3 ?(
                    searchTopics.length ?(
                         <ScrollView
                        contentContainerStyle={{flexGrow: 1}}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          top: 72,
                          zIndex: 1,
                          flex: 1,
                        //   height: 400,
                          marginTop:57
                        }}>
                        <View
                          style={{
                            backgroundColor: 'rgba(219, 233, 255, 1)',
                            paddingVertical: 20,
                            borderRadius: 16,
                          }}>
                          {searchTopics.map((item,index) => {
                            return (
                              <>
                                <TouchableOpacity
                                key={index}
                                  onPress={() => {
                                    // Keyboard.dismiss();
                                    // navigation.navigate('TopicQuestionsScreen', {
                                    //   data: item,
                                    //   subject_id: item.subject_id,
                                    //   chapter_id: item?.chapter_id,
                                    //   topic_id: item?.topic_id,
                                    //   chapterData: data,
                                    // });
                                    SetsearchTopics([]);
                                    setSearchText('');
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 16,
                                      fontFamily:'Jost-SemiBold',
                                      color: 'rgba(32, 34, 68, 1)',
                                      marginVertical: 3,
                                      paddingHorizontal: 10,
                                    }}>
                                    {item.topic_name}
                                  </Text>
                                </TouchableOpacity>
        
                                <View
                                  style={{
                                    height: 1,
                                    width: '100%',
                                    backgroundColor: 'lightgrey',
                                    marginVertical: 4,
                                  }}></View>
                              </>
                            );
                          })}
                        </View>
                      </ScrollView>
                    ) : (
                        <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                style={{
                  position: 'absolute',
                  width: '100%',
                  top: 72,
                  zIndex: 1,
                  flex: 1,
                //   height: 400,
                  marginTop:57
                }}>
                <View
                  style={{
                    backgroundColor: 'rgba(219, 233, 255, 1)',
                    paddingVertical: 20,
                    borderRadius: 16,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Jost-SemiBold',
                      color: 'rgba(32, 34, 68, 1)',
                      fontSize: 16,
                      textAlign: 'center',
                    }}>
                    No Result Found
                  </Text>
                </View>
              </ScrollView>
                    )

                ):null
            }

            {/* Question List */}

            {chapterData.length ? (
                <View style={[styles.shadowContainer]}>
                    <FlatList
                        scrollEnabled={false}
                        data={chapterData}
                        renderItem={(item) => (
                            <RenderChapterItem item={item} subject_id={data?.id} />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={<ActivityIndicator />}
                    />
                </View>
            ) : (
                <ActivityIndicator />
            )}
        </ScrollView>
    )
}

export default ChapterScreen

const styles = StyleSheet.create({
    backHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 20,
        // marginBottom: 20,
        alignItems: 'center',
        // backgroundColor: 'lightblue'

    },
    shadowContainer: {
        backgroundColor: 'rgba(245, 249, 255, 1)',
        borderRadius: 10,
        // padding: 10,
        marginVertical: 10,
        elevation: 10, //shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 30
    },
    rowContainer:
    {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    }
})


const RenderChapterItem = ({ item, subject_id }) => {
    const navigation = useNavigation();
    // const [chapterNumber, chapterTitle] = item.item.chapter_name.split(' - ');
    const [chapterNumber, chapterTitle] = item.item.chapter_name.split(' - ') || ["", ""];
    // console.log('item', item.item)
    let cnt=1;
    return (
        <View style={{ marginVertical: 10, flex: 1, }} key={cnt++}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{chapterNumber}-{' '}</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'rgba(9, 97, 245, 1)' }}>{chapterTitle}</Text>
            </View>

            {
                item.item.topic_data.map((topic, index) => (
                    <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('TopicQuestionsScreen', {
                          data: topic,
                          subject_id: subject_id,
                          chapter_id: item?.chapter_id,
                          topic_id: topic?.topic_id,
                        })
                    }
                    >
                    <View style={styles2.renderContaner}>
                        <View style={{ flexDirection: 'row' }}>  
                            <View style={styles2.chapterSequence}> 
                                <Text style={{ fontWeight: 'bold' }}>
                                    {topic?.topic_sequence}
                                </Text>
                            </View>
                
                            <View style={{ marginLeft: 5, marginTop: 5 }}>
                                <Text style={{ fontWeight: 'bold' }}>{topic?.topic_name}</Text>
                                <Text>{topic?.questions} Ques</Text>
                            </View>
                        </View>
                
                        <View style={{ flexDirection: 'row' }}> 
                            {topic?.pause_status == 'complete' ? (
                                <Ionicons name="checkmark-circle" size={25} style={{ paddingRight: 16 }} color={'green'} />
                            ) : null}
                
                            <Ionicons name="chevron-forward-sharp" size={25} />
                        </View>
                    </View>
                </TouchableOpacity>
                
                ))
            }

        </View>
    )
}

const styles2 = StyleSheet.create({
    renderContaner: {
        borderBottomWidth: 1, borderBlockColor: 'rgba(232, 241, 255, 1)', justifyContent: 'space-between', padding: 20, flexDirection: 'row', alignItems: 'center'
    },
    chapterSequence: {
        height: 50, width: 50, borderRadius: 25, borderWidth: 1.5, borderColor: 'rgb(202, 219, 247)', backgroundColor: 'rgb(219, 228, 243)', justifyContent: 'center', alignItems: 'center'
    }

});