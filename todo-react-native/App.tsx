import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ListRenderItem, Button } from 'react-native';

import useTodos from './useTodos';

// Alert does not work on web, thus I have defined a polyfill
// https://stackoverflow.com/questions/65481226/react-native-alert-alert-only-works-on-ios-and-android-not-web
import alert from './alert';

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  modifiedAt: string;
}

const App: React.FC = () => {
  const { todoItems, setTodoItems } = useTodos();

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
          onPress: () => {
            // Handle delete action (e.g., remove from state)
            setTodoItems(todoItems.filter(item => item.id !== id));
            // Optionally, you can send a request to the server to delete the item.
            // fetch(`https://localhost:7033/api/TodoItems/${id}`, { method: 'DELETE' });
          }
        }
      ]
    );
  };

  const handleEdit = (item: TodoItem) => {
    // Handle edit action (e.g., navigate to an edit screen or show an edit form)
    alert("Edit Item", `Editing item with ID: ${item.id}`);
    // You can navigate to another screen or show an input form to edit the item.
    // For example, using React Navigation:
    // navigation.navigate('EditTodo', { item });
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
    <View style={styles.container}>
      <FlatList
        data={todoItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
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

export default App;
