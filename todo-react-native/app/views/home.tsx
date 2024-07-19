import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import TodoItems from '../components/todo-items';

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <TodoItems />
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
