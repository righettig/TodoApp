import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';
import { RootStackParamList } from '../../App';
import { useContext, useState } from 'react';
import { TodoContext } from '../contexts/todoContext';

import alert from '../common/alert';

type EditProps = StackScreenProps<RootStackParamList, 'Edit'>;

const Edit: React.FC<EditProps> = ({ route, navigation }) => {
  const { item } = route.params;

  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    throw new Error('TodoContext not found');
  }

  const { editTodo } = todoContext;

  const handleAmendTodo = async () => {
    try {
      editTodo(item.id, title, description);
      
      alert("Edit Item", "Todo item updated",
        [
          {
            text: "OK",
            onPress: async () => {
              navigation.goBack(); // TODO: need to update home page todo items
            }
          }
        ]
      );

    } catch (error) {
      alert("Edit Item", "There was an error editing the todo item");
    }
  }

  const handleCancelEditTodo = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Todo</Text>

      <Text style={styles.labels}>Title</Text>
      <TextInput style={styles.inputs} value={title} onChangeText={setTitle} />

      <Text style={styles.labels}>Description</Text>
      <TextInput style={styles.inputs} value={description} onChangeText={setDescription} />

      <TouchableHighlight onPress={handleAmendTodo} underlayColor='#000000'>
        <Text style={styles.buttons}>Edit</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={handleCancelEditTodo} underlayColor='#000000'>
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

export default Edit;
