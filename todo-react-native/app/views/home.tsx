import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../../App';
import { useEffect } from 'react';

import useTodos from '../../useTodos';

import TodoItems from '../components/todo-items';

type HomeProps = StackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ route, navigation }) => {
  const { todoItems, setTodoItems } = useTodos();
  
  useEffect(() => {
    if (route.params?.newTodo) {
      setTodoItems([...todoItems, route.params.newTodo]);
    }
  }, [route.params?.newTodo]);
  
  return (
    <View style={styles.container}>
      <Button title="Add" onPress={() => navigation.navigate('Add')} />
      <TodoItems todoItems={todoItems} navigation={navigation} />
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
  }
});

export default Home;
