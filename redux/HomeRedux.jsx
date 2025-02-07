import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from './Header'
import Product from './Product'

const HomeRedux = () => {
    const products=[
           {
               name:"samsung",
               color:'blue',
               price:30000,
               image1:'../images/backimg1.jpeg',
           },
           {
               name:"apple",
               color:'white',
               price:40000,
               image1:'../images/backimg1.jpeg',
           },
           {
               name:"vivo",
               color:'green',
               price:20000,
               image1:'../images/backimg1.jpeg',
           },
       ]
  return (
    <View style={styles.container}>
      <Header />
    <ScrollView>
    {
        products.map((item,ind)=><Product item={item} key={ind}/>)
    }  
    </ScrollView>
    </View>
  )
}

export default HomeRedux

const styles = StyleSheet.create({

    container:{
        flex:1,
    }
})