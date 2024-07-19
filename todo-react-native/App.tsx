import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { TodoItem } from './TodoItem';

import Home from './app/views/home';
import About from './app/views/about';
import Edit from './app/views/edit';
import Add from './app/views/add';

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Edit: { item: TodoItem; };
  Add: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Edit" component={Edit} />
        <Stack.Screen name="Add" component={Add} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
