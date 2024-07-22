import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../../App';
import { useContext } from 'react';
import { TodoContext } from '../contexts/todoContext';

import TodoItems from '../components/todo-items';

type HomeProps = StackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const todoContext = useContext(TodoContext);
  
  if (!todoContext) {
    throw new Error('TodoContext not found');
  }

  const { items } = todoContext;

  return (
    <View style={styles.container}>
      <Button title="Add" onPress={() => navigation.navigate('Add')} />
      <TodoItems todoItems={items} navigation={navigation} />
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
