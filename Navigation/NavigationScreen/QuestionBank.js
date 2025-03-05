import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
//@ts-ignore
import { SliderBox } from 'react-native-image-slider-box';
// const SliderBox = require('react-native-image-slider-box').SliderBox;

const QuestionBank = () => {
  const images = [
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?mountains",
  ];
  // console.log('SliderBox:', SliderBox);
  return (
    <View>
    {/* <SliderBox
      images={images}
      autoplay
      circleLoop
      dotColor="#FF6347"
      inactiveDotColor="#90A4AE"
      sliderBoxHeight={200}
    /> */}
  
  </View>
  )
}

export default QuestionBank

const styles = StyleSheet.create({})