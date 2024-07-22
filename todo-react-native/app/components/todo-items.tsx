import { StyleSheet, Text, View, FlatList, ListRenderItem, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';

import { TodoItem } from '../../TodoItem';
import { deleteTodoItem } from '../../todos.service';
import { RootStackParamList } from '../../App';

// Alert does not work on web, thus I have defined a polyfill
// https://stackoverflow.com/questions/65481226/react-native-alert-alert-only-works-on-ios-and-android-not-web
import alert from '../../alert';

type TodoItemsProps = {
  todoItems: TodoItem[],
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
};

const TodoItems: React.FC<TodoItemsProps> = ({ todoItems, navigation }) => {
  const [todos, setTodoItems] = useState(todoItems);

  const handleDelete = (id: string) => {
    // Confirm delete action
    alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            await deleteTodoItem(id);

            // Handle delete action (e.g., remove from state)
            setTodoItems(todos.filter(item => item.id !== id));
          }
        }
      ]
    );
  };

  const handleEdit = (item: TodoItem) => {
    navigation.navigate('Edit', { item });
  };

  const renderItem: ListRenderItem<TodoItem> = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>Title: {item.title}</Text>
      <Text>Description: {item.description}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => handleEdit(item)} />
        <Button title="Delete" color="red" onPress={() => handleDelete(item.id)} />
      </View>
    </View>
  );

  return (
    <FlatList
        data={todoItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default TodoItems;
