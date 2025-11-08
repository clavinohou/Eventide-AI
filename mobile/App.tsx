import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import SuccessScreen from './src/screens/SuccessScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false, // Hide header for splash
        }}
      >
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Eventide AI',
            headerStyle: {
              backgroundColor: '#FFF8F5',
            },
            headerTintColor: '#2C2C2C',
            headerTitleStyle: {
              fontWeight: '600',
            },
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 400,
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 300,
                },
              },
            },
          }}
        />
        <Stack.Screen 
          name="Review" 
          component={ReviewScreen}
          options={{ 
            title: 'Review Event',
            headerStyle: {
              backgroundColor: '#FFF8F5',
            },
            headerTintColor: '#2C2C2C',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        />
        <Stack.Screen 
          name="Success" 
          component={SuccessScreen}
          options={{ 
            headerLeft: null, 
            title: 'Success',
            headerStyle: {
              backgroundColor: '#FFF8F5',
            },
            headerTintColor: '#2C2C2C',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

