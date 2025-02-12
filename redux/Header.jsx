import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Header = () => {
    const cartData=useSelector((state)=>state.reducer)
    console.log(cartData)
    const[cartItem,setcartItem]=useState(0)
    useEffect(()=>{
        setcartItem(cartData.length)
    },[cartData])
  return (
    <View>
      
      <Text style={{fontSize:20,textAlign:'right',backgroundColor:'tomato',padding:10}}>
      <TouchableOpacity>
        <Text style={{fontSize:20}}>🛒</Text>
      </TouchableOpacity>
        {cartItem}
        </Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({

})