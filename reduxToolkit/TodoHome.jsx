import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList,Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, removeTodo, completeTodo } from './slice/TodoSlice'
import CheckBox from 'react-native-check-box'

const TodoHome = () => {
  // const numColumns = Math.floor(Dimensions.get('window').width / 120); // Auto-adjust columns based on screen width

  const [todoText, setTodoText] = useState("")
  // const [ischecked, setischecked] = useState(true)
  const [isChecked, setIsChecked] = useState(false);
  // const [todos, setTodos] = useState(useSelector((state)=>state.todos))
  const dispatch = useDispatch()

  const todos = useSelector((state) => state.todos);
  const handleSubmit = () => {
    // console.log('handleSubmit')
    if (todoText.trim()) {
      dispatch(addTodo(todoText))
      setTodoText("")
    }
    console.log(todos)
  }

  return (
    <>
    <ScrollView>

      <View style={styles.container}>
        <Text style={{ fontSize: 20, color: 'tomato' }}>Todo App</Text>
        <TextInput
          placeholder='Enter task'
          value={todoText}
          // onChangeText={(text) => setTodoText(text)}
          onChangeText={setTodoText}
          style={styles.input}
          />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          >
          <Text style={{ color: 'white' }}>Submit</Text>
        </TouchableOpacity>
        <View style={{
          borderBottomWidth: 2,
          flexDirection: 'row',
          // justifyContent: 'space-between',
          // alignItems: 'center',
          // paddingHorizontal: 5
        }}>
          <Text style={{ fontSize: 20, flex: 1 }}>Todo Task</Text>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Text style={{ fontSize: 20 }}>Completed |</Text>
            <Text style={{ fontSize: 20 }}>Remove</Text>
          </View>
        </View>
  
        <View>
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}  // Disable FlatList scrolling
            // numColumns={numColumns}
            renderItem={({ item }) => (
              <View style={styles.todoItem}>
                {/* Task Text - Aligned to Left */}
                <Text style={styles.todoText}>{item.value}</Text>

                {/* Checkbox & Delete Button - Aligned to Right */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 40 }}>
                  <CheckBox
                    isChecked={item.completed}
                    onClick={() => dispatch(completeTodo({ id: item.id }))}
                    checkBoxColor="green"
                    />
                  <TouchableOpacity onPress={() => dispatch(removeTodo(item.id))}>
                    <Text style={styles.deleteText}>❌</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyboardDismissMode='on-drag' 
            />
        </View>
      </View>
</ScrollView>
            </>
  )
}

export default TodoHome

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, backgroundColor: "#f9f9f9" },
  input: { backgroundColor: "#fff", padding: 10, marginVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#ccc" },
  button: {
    backgroundColor: 'green', padding: 10, marginVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: "#ccc", alignItems: 'center',
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 5,
  },
  todoText: {
    fontSize: 16,
    flex: 1
  },
  deleteText: {
    fontSize: 20,
    color: "red",
  },
})
