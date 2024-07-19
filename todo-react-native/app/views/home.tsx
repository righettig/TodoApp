import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../../App';

import TodoItems from '../components/todo-items';

type HomeProps = StackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TodoItems navigation={navigation} />
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
