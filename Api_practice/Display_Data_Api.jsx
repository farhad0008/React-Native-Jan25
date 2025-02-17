import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const Display_Data_Api = () => {
    const [data, setdata] = useState([])
    // const fetchData = async () => {
    //     const url = 'https://jsonplaceholder.typicode.com/posts'
    //     let result = await fetch('https://jsonplaceholder.typicode.com/posts');
    //     result = await result.json();
    //     setdata(result)
    // }
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts/1") // Example REST API
            .then((response) => response.json())
            .then((json) => {
                setdata(json);
                // setLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    const createPost = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts',
            {
                method:'POST',
                headers: { "Content-Type": "application/json" },
                body:  JSON.stringify({ title: "New Post", body: "Hello World!", userId: 1 })
            });
            const ValueJson=await response.json();
            console.log("created",ValueJson)
        } catch (e) {
            console.error(e)
        }
    }
    const updateePost = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1',
            {
                method:'PUT',
                headers: { "Content-Type": "application/json" },
                body:  JSON.stringify({ title: "New Delete", body: "Hello World!!!!", userId: 1 })
            });
            const ValueJson=await response.json();
            console.log("created",ValueJson)
        } catch (e) {
            console.error(e)
        }
    }
    const deleteData=async()=>{
        try{
            const response= await fetch('https://jsonplaceholder.typicode.com/posts/1',
                {method:'DELETE'}
            );
            if(response.status===200)
                console.log(response)
        }catch(e){
            console.error(e)
        }
    }
    return (
        <>
            <ScrollView>
                {/* {
                    data.length ?
                        data.map((Item) =>
                            <View>
                                <Text>id:{Item.id}</Text>
                                <Text>title:{Item.title}</Text>
                                <Text>body:{Item.body}</Text>
                            </View>
                        ) : null
                } */}
                <Button title='Click To Post' onPress={createPost} />
                <Button title='Click To Update' onPress={updateePost} />
                <Button title='Click To Delete' onPress={deleteData} />
            </ScrollView>
        </>
    )
}

export default Display_Data_Api

const styles = StyleSheet.create({})