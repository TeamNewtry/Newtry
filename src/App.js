import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'react-native-elements';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tabs from './navigation/Tabs';
import ProductView from './navigation/ProductView';
import {SafeAreaProvider} from 'react-native-safe-area-context/src/SafeAreaContext';
import {LocalizationProvider} from './components/Translations';
import auth from '@react-native-firebase/auth';
import {AuthProvider} from './components/Authentication';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <LocalizationProvider>
        <ThemeProvider>
          <AuthProvider>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name={'HomeScreen'} component={Tabs} />
                <Stack.Screen name={'ProductView'} component={ProductView} />
              </Stack.Navigator>
            </NavigationContainer>
          </AuthProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </SafeAreaProvider>
  );
};

export default App;
