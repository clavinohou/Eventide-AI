import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import SuccessScreen from './src/screens/SuccessScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Cal-MGR' }}
        />
        <Stack.Screen 
          name="Review" 
          component={ReviewScreen}
          options={{ title: 'Review Event' }}
        />
        <Stack.Screen 
          name="Success" 
          component={SuccessScreen}
          options={{ headerLeft: null, title: 'Success' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

