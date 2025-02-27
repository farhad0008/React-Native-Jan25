import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatGrid } from 'react-native-super-grid'
import { AddToCart } from './slice/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { green } from 'react-native-reanimated/lib/typescript/Colors';
import { useNavigation } from '@react-navigation/native';
import CartDetails from './CartDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../screen/Login';

const ProductList = () => {
    const [product, setProduct] = useState([
        {
            id: Date.now() + Math.random(), img: '../images/backimg1.jpeg', name: 'Samsung', price: 30000,
            desc: 'Samsung Galaxy M05 (Mint Green, 4GB RAM, 64 GB Storage) | 50MP Dual Camera | Bigger 6.7" HD+ Display | 5000mAh Battery | 25W Fast Charging |'
        },
        {
            id: Date.now() + Math.random(), img: '../images/backimg1.jpeg', name: 'Apple', price: 50000,
            desc: 'Apple Galaxy M05 (Mint Green, 4GB RAM, 64 GB Storage) | 50MP Dual Camera | Bigger 6.7" HD+ Display | 5000mAh Battery | 25W Fast Charging |'
        },
        {
            id: Date.now() + Math.random(), img: '../images/backimg1.jpeg', name: 'Vivo', price: 1000,
            desc: 'Vivo Galaxy M05 (Mint Green, 4GB RAM, 64 GB Storage) | 50MP Dual Camera | Bigger 6.7" HD+ Display | 5000mAh Battery | 25W Fast Charging |'
        },
        {
            id: Date.now() + Math.random(), img: '../images/backimg1.jpeg', name: 'Redmi', price: 5000,
            desc: 'Redmi Galaxy M05 (Mint Green, 4GB RAM, 64 GB Storage) | 50MP Dual Camera | Bigger 6.7" HD+ Display | 5000mAh Battery | 25W Fast Charging |'
        },
        {
            id: Date.now() + Math.random(), img: '../images/backimg1.jpeg', name: 'Oppo', price: 3000,
            desc: 'Oppo Galaxy M05 (Mint Green, 4GB RAM, 64 GB Storage) | 50MP Dual Camera | Bigger 6.7" HD+ Display | 5000mAh Battery | 25W Fast Charging |'
        },
        {
            id: Date.now() + Math.random(), img: '../images/backimg1.jpeg', name: 'Huwai', price: 3000,
            desc: 'Huwai Galaxy M05 (Mint Green, 4GB RAM, 64 GB Storage) | 50MP Dual Camera | Bigger 6.7" HD+ Display | 5000mAh Battery | 25W Fast Charging |'
        },
    ]);
    const[userData,setuserData]=useState(null)

    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.cartItem)

    const addToCart = (item) => {
        dispatch(AddToCart(item))
        // checkUser()
    }

    const checkUser = async () => {
        // await AsyncStorage.removeItem('userToken')
        // console.log("checkUser")
        const response = await AsyncStorage.getItem('userToken')
        if(response){
            console.log("userToken--",JSON.parse(response));
            
            const userDetail = await AsyncStorage.getItem('userDetail')
            console.log("userDetail--",userDetail)
            setuserData(JSON.parse(userDetail))
        }else{
            navigation.navigate(Login);
        }
        // return response.json();
    }
    useEffect(()=>{
        checkUser()
    },[])
    const navigation = useNavigation({ navigation })

    return (
        <>

            <View style={{ height: 50, width: '100%', backgroundColor: 'skyblue',flexDirection:'row', justifyContent: 'space-between', alignItems: 'center' }}>
              {
                  userData!==null?(
                      <Text style={{paddingLeft:10,fontWeight:'bold',fontSize:20}}>Hi,{userData.username}</Text>
                  ):null
              } 
                      <TouchableOpacity onPress={() => navigation.navigate(CartDetails)}>
                    <Text style={{ paddingRight: 10, fontSize: 20 }}>cartItem:{cartData.length}</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
            </ScrollView>
            <View style={{ alignItems: 'center', marginTop: 10, }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>ProductList</Text>
            </View>

            <FlatGrid
                itemDimension={130}
                data={product}
                style={styles.gridView}
                spacing={8}
                renderItem={({ item }) => (
                    <View style={{ flex: 1, height: 'auto', backgroundColor: 'lightblue', borderWidth: 1, borderColor: 'gray', borderRadius: 10 }}>
                        {/* <Image style={{height:40,width:40}} source={{uri:item.img}} /> */}
                        <Image source={require('../images/backimg1.jpeg')} style={{ height: 150, width: '100%', borderRadius: 8, resizeMode: "cover" }} />
                        <Text style={{ fontSize: 20, padding: 8, fontWeight: 'bold', justifyContent: 'flex-start' }}>{item.name}</Text>
                        <Text style={{ fontSize: 15, padding: 8, justifyContent: 'flex-start' }}>{item.desc}</Text>
                        <Text style={{ fontSize: 20, padding: 8, fontWeight: 'bold', justifyContent: 'flex-start' }}>{'\u20B9'}{item.price}</Text>

                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 }}>
                            <TouchableOpacity
                                style={{height: 40,width: 40,backgroundColor: 'green',justifyContent: 'center',alignItems: 'center',  borderRadius: 5,}}>
                                <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'white' }}>-</Text>
                            </TouchableOpacity>
                            <Text>{cartData.length> 0 ? item.quantity:"0"}</Text>
                            <TouchableOpacity
                                style={{height: 40,width: 40,backgroundColor: 'green',justifyContent: 'center',alignItems: 'center',  borderRadius: 5,}}>
                                <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'white' }}>+</Text>
                            </TouchableOpacity>
                        </View> */}

                        <View>
                            <TouchableOpacity
                                style={{ flex: 1, height: 30, width: '100%', backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', borderRadius: 15, marginBottom: 10 }}
                                onPress={() => addToCart(item)}
                            >
                                <Text style={{ color: 'white' }}>Add To Cart</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </>
    )
}

export default ProductList

const styles = StyleSheet.create({})