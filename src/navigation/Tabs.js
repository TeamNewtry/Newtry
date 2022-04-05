import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';

import SettingsScreen from './screens/SettingsScreen';
import HomeScreen from './screens/HomeScreen';
import ScanScreen from './screens/ScanScreen';

const Tab = createBottomTabNavigator();

function ScanTabBar({children, onPress}) {
  return (
    <TouchableOpacity
      style={{
        top: '-5%',
        backgroundColor: '#60dbfd',
        borderRadius: 75,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <View style={{width: 35, height: 35, borderRadius: 35}}>{children}</View>
    </TouchableOpacity>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 50,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: '#D7E1DF',
          borderTopWidth: 3,
          borderTopColor: '#03936f',
          // ...styles.shadow
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/hut.png')}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Find"
        component={ScanScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/barcode.png')}
              style={{
                width: 50,
                height: 50,
                top: -36,
                resizeMode: 'contain',
              }}
            />
          ),

          tabBarButton: props => <ScanTabBar {...props} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../assets/settings.png')}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowRadius: 2,
    elevation: 4,
  },
});

export default Tabs;
