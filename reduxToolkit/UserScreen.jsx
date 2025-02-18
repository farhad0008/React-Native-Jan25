import React, { useEffect } from "react";
import { View, Text, Button, FlatList, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addPost, fetchPost } from "./slice/postSliceThunk";
const UserScreen = () => {
  const dispatch = useDispatch();
  const { posts, status,error } = useSelector((state) => state.posts);
  console.log('error'.error)
  console.log('post',posts)

  useEffect(() => {
    dispatch(fetchPost());
  }, [dispatch]);

  const handleAddPost = () => {
    const newPost = { title: "New Post", body: "This is a new post", userId: 1 };
    dispatch(addPost(newPost));
  };

  return (
    <View>
      <Button title="Add Post" onPress={handleAddPost} />

      {status ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item,index) =>index.toString()}
          renderItem={({ item ,index}) =><View style={{justifyContent:'center',alignItems:'center'}}><Text>{item.id}</Text><Text>{item.title}</Text></View> }
        />
      )}
    </View>
  );
};

export default UserScreen;
