import { StackScreenProps } from '@react-navigation/stack';
import { View, Text, Button } from 'react-native';
import { RootStackParamList } from '../../App';

type EditProps = StackScreenProps<RootStackParamList, 'Edit'>;

const Edit: React.FC<EditProps> = ({ route, navigation }) => {
  const { item } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Title: {item.title}</Text>
        <Text>Description: {item.description}</Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default Edit;
