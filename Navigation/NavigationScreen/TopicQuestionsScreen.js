import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, FlatList, Share, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import RenderHTML from 'react-native-render-html';

const TopicQuestionsScreen = () => {
    const [chapterQuestion, SetchapterQuestion] = useState([]);
    const [userToken, setUserToken] = useState(null);
    const [status, setStatus] = useState('');
    const [nextIndex, SetnextIndex] = useState(0);

    const route = useRoute();
    const navigation = useNavigation();
    const focus = useIsFocused();

    const { data, subject_id, chapter_id, topic_id } = route.params;
    // console.log('subject_id', subject_id)
    // console.log('chapter_id', chapter_id)
    // console.log('topic_id', topic_id)

    const { width } = useWindowDimensions();
    const tagStyle = {
        p: {
            color: 'black',
            padding: 0,
            fontWeight: '600',
            marginTop: 0,
        },
        td: {
            borderColor: 'black',
            borderWidth: 1,
        },
    };

    const chapterQuestionFunc = async () => {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token)
        // console.log('chapterQuestionFunc',userToken)
        try {
            const response = await fetch('https://test.moprep.in/api/chapterQuestions',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json', // Important for JSON data
                    },
                    body: JSON.stringify({
                        subject_id: subject_id,
                        chapter_id: chapter_id,
                        topic_id: topic_id,
                    })
                }
            )
            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            const result = await response.json(); // Convert response to JSON
            // console.log('SetchapterQuestion Data:', result.pause_status);
            setStatus(result.pause_status);
            SetchapterQuestion(result.result);
            SetnextIndex(result.question_index)
            // console.log('searchFunc Data:',response );
        } catch (r) {
            console.error("chapterQuestionFuncError", e)
        }
    }
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

    const StartResumeTest = async () => {
        if (status === 'complete') {
            try {
                // const token = AsyncStorage.getItem('userToken');

                const response = fetch('https://test.moprep.in/api/chapterQuestionsDelete', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Content-Type': 'application/json', // Important for JSON data
                    },
                    body: JSON.stringify({
                        subject_id: subject_id,
                        chapter_id: chapter_id,
                        topic_id: topic_id,
                    })
                });
                // const result = await response.json(); // Convert response to JSON
                if (!response?.data?.error) {
                    navigation.navigate('QuestionScreen', {
                        subject_id,
                        chapter_id,
                        topic_id,
                        totalque: data?.questions,
                        status: status,
                        nextIndex: status == 'complete' ? 0 : nextIndex,
                        chapterData: data,
                        from: from,
                    });
                } else {
                    console.log('StartResumeTest Else response')
                }
            } catch (e) {
                console.error("StartResumeTestError", e)
            }
        } else {

            navigation.navigate('QuestionScreen', {
                subject_id,
                chapter_id,
                topic_id,
                totalque: data?.questions,
                status: status,
                nextIndex: status == 'complete' ? 0 : nextIndex,
                chapterData: chapterData,
                from: from,
            });

        }
    }


    useEffect(() => {
        chapterQuestionFunc()
    }, [focus])

    useEffect(() => {
        chapterQuestionFunc()
    }, [])

    return (
        <View style={{ backgroundColor: 'rgba(245, 249, 255, 1)', flex: 1 }}>
            <View style={styles.subContainer}>
                {/* backheadercontainer */}
                <View style={styles.backHeader}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                        >
                            <AntDesign name='arrowleft' size={25} color={'black'} />
                        </TouchableOpacity>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 10, }}>{data.topic_name}</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 13, marginLeft: 10, color: 'gray' }}>{data.questions} Question</Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <TouchableOpacity
                            onPress={() => {

                            }}>
                            <MaterialIcons name="info" size={22} color={'gray'} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                onShare();
                            }}>
                            <MaterialIcons name="share" size={22} color={'gray'} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* shadow container */}
                {
                    chapterQuestion.length >= 1 ? (

                        <View style={styles.shadowContainer}>
                            <FlatList
                                // showsVerticalScrollIndicator={true}
                                data={chapterQuestion}
                                renderItem={(item, index) => (
                                    <TouchableOpacity
                                    >
                                        <View style={styles.rowContainer}>
                                            <View style={{
                                                borderWidth: 1, borderRadius: 8, borderColor: 'black', alignSelf: 'flex-start',
                                                marginTop: 5, height: 50, width: 50, alignItems: 'center', justifyContent: 'center',
                                            }}>
                                                <Text style={{ textAlign: 'center' }}>{item.item.sno}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 10, }}>
                                                <View style={{ flex: 1 }}>
                                                    <RenderHTML
                                                        contentWidth={width}
                                                        source={{ html: item.item.question }}
                                                        tagsStyles={tagStyle}
                                                    />

                                                    {/* <Text>{item.item.question}</Text> */}
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(_, index) => index.toString()}
                            />
                            <TouchableOpacity style={styles.button} onPress={StartResumeTest}>
                                <Text style={styles.buttonText}>{
                                    status == 'resume' ? 'Resume Question Bank'
                                        : status == 'complete' ? 'Restart Question Bank' : 'Start Question Bank'
                                }</Text>
                                <View style={styles.btnRound}>
                                    <Feather name={'arrow-right'} size={25} color={'black'} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <ActivityIndicator />
                    )
                }
            </View>
        </View>
    )
}

export default TopicQuestionsScreen

const styles = StyleSheet.create({
    subContainer: {
        paddingHorizontal: 20,
        flex: 1,
        paddingBottom: 50
    },
    backHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20
    },
    shadowContainer: {
        flex: 1,
        backgroundColor: 'rgba(245, 249, 255, 1)',
        borderRadius: 10,
        // padding: 10,
        marginVertical: 10,
        elevation: 10, //shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginTop: 30,
        paddingBottom: 40,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(232, 241, 255, 1)',
        paddingVertical: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 33,
        marginTop: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: -25,
        width: '90%',
        alignSelf: 'center',
        // shadowColor: '#000',
        // shadowOpacity: 0.2,
        // shadowOffset: { width: 0, height: 2 },
        // shadowRadius: 4,
        // elevation: 5,//shedow
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 20,
        borderRadius: 10,
    },
    btnRound: {
        position: 'absolute',
        right: 5, // Position the circle at the end
        width: 48,
        height: 48,
        borderRadius: 24, // Make it a perfect circle
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
})