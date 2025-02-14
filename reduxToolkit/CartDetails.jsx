import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import ProductList from './ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { DecreamentQuantity, IncreamentQuantity, removeCartItem } from './slice/cartSlice';

const CartDetails = () => {
  const navigation = useNavigation({ navigation })
  const cartItem = useSelector((state) => state.cartItem);
  const dispatch=useDispatch()
  return (
    <>
      <SafeAreaView>
        {/* --- header--- */}
        <View style={{ height: 50, width: '100%', backgroundColor: 'skyblue', justifyContent: 'center', }}>
          <TouchableOpacity onPress={() => navigation.navigate(ProductList)}>
            <Text style={{ fontSize: 20, marginLeft: 5 }}>{'<'}Back</Text>
          </TouchableOpacity>
        </View>
        {/* ---Content--- */}
        <View style={{ padding: 5, backgroundColor: "#fff" }}>
          {/* Header */}
          <View style={{ flexDirection: 'row', borderBottomWidth: 2, borderColor: 'black', paddingVertical: 8, backgroundColor: "#f1f1f1" }}>
            <Text style={{ flex: 0.5, textAlign: 'center', fontWeight: 'bold' }}>No.</Text>
            <Text style={{ flex: 1.5, textAlign: 'center', fontWeight: 'bold' }}>Name</Text>
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Price</Text>
            <Text style={{ flex: 1.5, textAlign: 'center', fontWeight: 'bold' }}>Quantity</Text>
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Total</Text>
            <Text style={{ flex: 0.5, textAlign: 'center', fontWeight: 'bold' }}>Remove</Text>
          </View>

          {/* Body */}
          {
            cartItem.map((val, ind) => (
              <View key={ind} style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderColor: "#ddd" }}>
                <Text style={{ flex: 0.5, textAlign: 'center' }}>{ind + 1}</Text>
                <Text style={{ flex: 1.5, textAlign: 'center' }}>{val.name}</Text>
                <Text style={{ flex: 1, textAlign: 'center' }}>${val.price.toFixed(2)}</Text>

                {/* Quantity Controls */}
                <View style={{ flex: 1.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity style={{ height: 35, width: 35, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginHorizontal: 5 }}
                
                  onPress={()=>dispatch(DecreamentQuantity(ind))}
                  >
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>-</Text>
                  </TouchableOpacity>

                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{val.quantity}</Text>

                  <TouchableOpacity style={{ height: 35, width: 35, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginHorizontal: 5 }}
                    onPress={()=>dispatch(IncreamentQuantity(ind))}
                  >
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>+</Text>
                  </TouchableOpacity>
                </View>

                <Text style={{ flex: 1, textAlign: 'center' }}>${(val.price * val.quantity).toFixed(2)}</Text>
                <TouchableOpacity style={{ flex: 0.5, textAlign: 'center' }}
                onPress={()=>dispatch(removeCartItem(ind))}
                >
                    <Text style={{ fontSize: 20,textAlign: 'center'}}>❌</Text>
                </TouchableOpacity>
              </View>
            ))
          }
        </View>

      </SafeAreaView>
    </>
  )
}

export default CartDetails

const styles = StyleSheet.create({})