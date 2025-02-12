import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, removeTodo } from './slice/TodoSlice'
import CheckBox from 'react-native-check-box'

const TodoHome = () => {
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
        <View style={{ borderBottomWidth: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ textAlign: 'left', fontSize: 20 }}>Todo Task</Text>
          {/* <Text style={{ textAlign: 'right', fontSize: 20,alignItems:'flex-end'}}>Complated</Text> */}
          <Text style={{ textAlign: 'right', fontSize: 20 }}>Complated | Remove</Text>
        </View>
        <View>
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.todoItem}>
                <Text style={styles.todoText}>{item.value}</Text>
                <CheckBox
                  isChecked={isChecked}
                  onClick={() => setIsChecked(!isChecked)}
                  checkBoxColor="green"
                />
                <TouchableOpacity onPress={() => dispatch(removeTodo(item.id))}>
                  <Text style={styles.deleteText}>❌</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

      </View>
    </ScrollView>
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
  },
  deleteText: {
    fontSize: 20,
    color: "red",
  },
})
