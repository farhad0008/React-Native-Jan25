import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addToCart,removeFromCart } from './action'
import {useDispatch, useSelector} from 'react-redux'

const Product = ({ item }) => {
    const dispatch=useDispatch();
    const handleRemoveFromCart=(item)=>{
       dispatch(removeFromCart(item.name))
   }
    const handleAddToCart=(item)=>{
         dispatch(addToCart(item))
    }
    const[isAdded,setIsAdded]=useState(false)
    const cartItem=useSelector((state)=>state.reducer);
    useEffect(()=>{
        let result=cartItem.filter((element=>element.name===item.name))
        if(result.length){
            setIsAdded(true)
        }else{
            setIsAdded(false)
        }
    },[cartItem])
    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    <View style={{ alignItems: 'center', padding: 10, borderWidth: 2, borderColor: 'black' }} >
                        <Image style={{ height: 100, width: 100 }} source={require('../images/backimg1.jpeg')} />
                        <Text style={{ fontSize: 24 }}>{item.name}</Text>
                        <Text style={{ fontSize: 24 }}>{item.price}</Text>
                        <Text style={{ fontSize: 24 }}>{item.color}</Text>
                        {
                            isAdded?<Button title='Remove To Cart' onPress={()=>handleRemoveFromCart(item)}/>
                            :<Button title='Add To Cart' onPress={()=>handleAddToCart(item)}/>
                        }
                    </View>
                }
            </ScrollView>
        </View>
            )
}

export default Product

const styles = StyleSheet.create({

    container: {
        flex: 1,
    }
})