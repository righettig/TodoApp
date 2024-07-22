import { StyleSheet, Text, View, FlatList, ListRenderItem, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TodoItem } from '../models/todo-item';
import { RootStackParamList } from '../../App';
import { useContext } from 'react';
import { TodoContext } from '../../app/contexts/todoContext';

// Alert does not work on web, thus I have defined a polyfill
// https://stackoverflow.com/questions/65481226/react-native-alert-alert-only-works-on-ios-and-android-not-web
import alert from '../common/alert';

type TodoItemsProps = {
  todoItems: TodoItem[],
  navigation: StackNavigationProp<RootStackParamList, 'Home'>
};

const TodoItems: React.FC<TodoItemsProps> = ({ todoItems, navigation }) => {
  const todoContext = useContext(TodoContext);
  
  if (!todoContext) {
    throw new Error('TodoContext not found');
  }

  const { deleteTodo } = todoContext;

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
            deleteTodo(id);
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
