import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';
import { RootStackParamList } from '../../App';
import { useState } from 'react';
import { addTodoItem } from '../../todos.service';

import alert from '../../alert';

type AddProps = StackScreenProps<RootStackParamList, 'Add'>;

const Add: React.FC<AddProps> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addTodo = async () => {
    try {
      const newTodo = await addTodoItem({ id: '', title, description });
      alert("Add Item", "Todo item added",
        [
          {
            text: "OK",
            onPress: async () => {
              navigation.navigate('Home', { newTodo });
            }
          }
        ]
      );

    } catch (error) {
      alert("Add Item", "There was an error adding the todo item");
    }
  }

  const cancelAddTodo = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Todo</Text>

      <Text style={styles.labels}>Title</Text>
      <TextInput style={styles.inputs} value={title} onChangeText={setTitle} />

      <Text style={styles.labels}>Description</Text>
      <TextInput style={styles.inputs} value={description} onChangeText={setDescription} />

      <TouchableHighlight onPress={addTodo} underlayColor='#000000'>
        <Text style={styles.buttons}>Add</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={cancelAddTodo} underlayColor='#000000'>
        <Text style={styles.buttons}>Go back</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '45%',
    paddingTop: '5%'
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  labels: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  inputs: {
    width: '80%',
    marginTop: 12,
    marginBottom: 20,
    borderWidth: 1,
    height: 45,
    fontSize: 16,
    color: '#000000'
  },
  buttons: {
    padding: 15,
    margin: 5,
    fontSize: 16,
    backgroundColor: '#DDDDDD',
    width: 150,
    height: 50,
    textAlign: 'center'
  }
});

export default Add;
