import { ScrollView, StyleSheet, Text, View, RefreshControl, TouchableOpacity, Dimensions, FlatList, Image } from 'react-native';

import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';
// import {SliderBox} from 'react-native-image-slider-box';
import { SliderBox } from 'react-native-image-slider-box';
import { useNavigation } from '@react-navigation/native';
import ChapterScreen from './ChapterScreen';

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiODAzOGQyODNhMjgyOWM0ZWI3ZTEwMmQ3NDdmMmUyNGNkMWQ4ODlhNWE4ZjdmOThkN2MxYzMyODdkNTk1ZGFiMDQwZTM1MGU1NjEzOWU5MmMiLCJpYXQiOjE3NDA3MjcyOTEsIm5iZiI6MTc0MDcyNzI5MSwiZXhwIjoxNzcyMjYzMjkxLCJzdWIiOiIzMzQxIiwic2NvcGVzIjpbXX0.sd5wX_A4KG9mnoBOH9_8jZfBTWHT_XnqAMeaLvUaOyNls-pkAxIa7G_TjfoYtlOayXM6ExIPIioDnl8A0Sm19WYPCsNzYNGPT-3sFRoX0DWLbM6whwmh2Yon5-sQCHv0VsDCbdJBNuBZ_bO1mJFDSPcY1gbAXRc2_aJIhemFW7eQZfuyFYVM7CmYHBDF9Ke3j_OQOM0hJl_vdA14NKfM95Uv-7i-AlzD584k2iNg7BV4joLqeAyYv65icRbEYKcR78pVkEyGKsUwJrSKeRjIbKATRCdMVEwNVk6f_Srx1rOgnrQqbHfarAwKFxFW_mBsSCdV7_6yryO95ea2FiyDjEU6kwDZ7_XzXA18W1TLYbEm1NdyZU57i9PmVQZgi0pHP8dlcQLHTGzvjv5N_ihI1JgJ4rgF27w9jZ0id9zOUQjG27nmwGQBn_IrxVllkNqn1YrnQIamFpeOmlaazxfqCS-i7DcLD0HOPB-kgu7L6AtbaAaGcE3SdMA5TK_TUJUAXX6a-hjU4_d8J5UBpS5dXxQONhgH61hAICqWvJk772QTJ9FnEA--MMaEu5OqwFxqze9051cza6BnQiZ-PcD9hR7MMg87J6kw1XwmzI_F9w_PiBFMYdVRHb1YoCVDGd0K4TzkRi8XLWqym3LqzWX_rv4VBhteb_14aMOMBOVXQos"; // Replace with actual token
const ScreenWidth = Dimensions.get('screen').width;

const HomeScreen = () => {
    const [bannerImages, setImageBanner] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [unComQueBan, setUnComQueBan] = useState([]);

    const navigation = useNavigation();

    // const ScreenWidth = Dimensions.get("window").width;
    const getImages = async () => {
        try {
            const response = await fetch('https://test.moprep.in/api/bannerList', {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("dataImages...", data)
            setImageBanner(Array.isArray(data.result) ? data.result.map(item => item.image) : []);
            // if (data && Array.isArray(data.result)) {
            //     setImageBanner(data.result.map(item => item.image));
            // } else {
            //     console.warn("Unexpected API response format:", data);
            // }

        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    const uncompletedQuestionBank = async () => {
        try {
            const response = await fetch('https://test.moprep.in/api/v2/uncompletedQuestionBank?course_master_id=1',
                {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            const data = await response.json();
            setUnComQueBan(data.result);
            console.log('uncompletedQuestionBank', data);
        } catch (error) {
            console.error("Error fetching question banks:", error);
        }
    };

    useEffect(() => {
        getImages();

        uncompletedQuestionBank();
    }, []);

    const handleRefresh = async () => {
        setRefreshing(true);
        await uncompletedQuestionBank();
        setRefreshing(false);
        await getImages();
        console.log("bannerImages....", bannerImages)
    };
    const onImagePressed = (index) => {
        console.log("Image clicked at index:", index);
    };

    const QueBankOnPress = async (item) => {
        // await AsyncStorage.setItem('storeData', JSON.stringify(item))
        console.log("QueBankOnPress",item)
        navigation.navigate("ChapterScreen",{data:item});
        
    }

    return (
        <ScrollView
            style={{ paddingHorizontal: 0, backgroundColor: 'rgba(245, 249, 255, 1)' }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        >
            <View style={styles.headerContainer}>
                <View>
                    <Text style={{ fontSize: 23, fontWeight: 'bold' }}>Hi,</Text>
                    <Text style={{ color: 'gray' }}>What would you like to learn today?</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={getImages}>
                        <Ionicons name="bookmark-sharp" size={25} color={'rgba(9, 97, 245, 1)'} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F2F2', padding: 8 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold", color: 'black' }}>UPSC CMS</Text>
            </View>
            {/* slider images.. */}

            {/* <SliderBox
                autoplay
                circleLoop
                images={bannerImages}
                ImageComponentStyle={{ width: ScreenWidth / 1.1 }}
                resizeMode={'contain'}
                onCurrentImagePressed={onImagePressed}
                dotStyle={{
                    width: 0,
                    height: 0,
                    borderRadius: 0,
                    marginHorizontal: 0,
                    padding: 0,
                    margin: 0,
                }}
            /> */}

            {/* <SliderBox
                autoplay
                circleLoop
                images={bannerImages}
                ImageComponentStyle={{ width: ScreenWidth / 1.1 }}
                resizeMode={'contain'}
                onCurrentImagePressed={onImagePressed}
                dotStyle={{
                    width: 0,
                    height: 0,
                    borderRadius: 0,
                    marginHorizontal: 0,
                    padding: 0,
                    margin: 0,
                }}
            /> */}

            {/* Shadow Container */}
            <View style={{ paddingHorizontal: 20, flex: 1 }}>
                <View style={styles.shadowContainer}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', marginVertical: 20, marginLeft: 10 }}>
                        Question Banks
                    </Text>

                    <FlatList
                        scrollEnabled={false}
                        data={unComQueBan}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={[{ flexDirection: 'row', alignItems: 'center', padding: 10, marginHorizontal: 3, marginBottom: 10 }, styles.shadowContainer]}
                                // onPress={()=>QueBankOnPress(item)}
                                onPress={async() => {
                                    // await AsyncStorage.setItem('storeData',JSON.stringify(item))
                                    navigation.navigate('ChapterScreen', {data: item})
                                }
                            }
                            >
                                <Image source={{ uri: item.image }} style={{ height: 50, width: 50, borderRadius: 10, marginRight: 10 }} />
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <Progress.Bar
                                            progress={1 - item.left_questions / item.total_questions}
                                            width={85}
                                            color={'rgba(9, 97, 245, 0.45)'}
                                            borderColor={'rgba(232, 241, 255, 1)'}
                                        />
                                        <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 13 }}>{item.left_questions} Ques Left</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>

            {/* Live test container */}
            <View style={{ paddingHorizontal: 20, flex: 1 }}>
                <View style={styles.shadowContainer}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', marginVertical: 20, marginLeft: 10 }}>Test</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>No ongoing LIVE TEST</Text>
                    </View>
                </View>
            </View>
            {/* <View>
                        <SliderBox
                autoplay
                circleLoop
                images={bannerImages}
                ImageComponentStyle={{ width: ScreenWidth / 1.1 }}
                resizeMode={'contain'}
                onCurrentImagePressed={onImagePressed}
                dotStyle={{
                    width: 0,
                    height: 0,
                    borderRadius: 0,
                    marginHorizontal: 0,
                    padding: 0,
                    margin: 0,
                }}
            />
            </View> */}
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginHorizontal: 20
    },
    shadowContainer: {
        backgroundColor: 'rgba(245, 249, 255, 1)',
        borderRadius: 20,
        // padding: 10,
        marginVertical: 10,
        elevation: 10, //shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        paddingVertical: 10, paddingHorizontal: 20
    },
    sdd: {
        backgroundColor: 'rgba(245, 249, 255, 1)',
        borderRadius: 20,
        elevation: 10,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});
