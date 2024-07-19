import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';
import { RootStackParamList } from '../../App';
import { useState } from 'react';
import { editTodoItem } from '../../todos.service';

import alert from '../../alert';

type EditProps = StackScreenProps<RootStackParamList, 'Edit'>;

const Edit: React.FC<EditProps> = ({ route, navigation }) => {
  const { item } = route.params;

  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  const editTodo = async () => {
    try {
      await editTodoItem({ ...item, title, description });
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

  const cancelEditTodo = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Todo</Text>

      <Text style={styles.labels}>Title</Text>
      <TextInput style={styles.inputs} value={title} onChangeText={setTitle} />

      <Text style={styles.labels}>Description</Text>
      <TextInput style={styles.inputs} value={description} onChangeText={setDescription} />

      <TouchableHighlight onPress={editTodo} underlayColor='#000000'>
        <Text style={styles.buttons}>Edit</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={cancelEditTodo} underlayColor='#000000'>
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
