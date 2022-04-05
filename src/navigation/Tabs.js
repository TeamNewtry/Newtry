import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import SettingsScreen from './screens/SettingsScreen';
import HomeScreen from './screens/HomeScreen';
import ScanScreen from './screens/ScanScreen';
import {BottomNavigation} from 'react-native-paper';

const Tab = createBottomTabNavigator();

function ScanTabBar({children, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1.5}}
        colors={['#60dbfd', '#24FF00']}
        style={styles.scanButtonCircle}>
        <View style={{width: 35, height: 35, borderRadius: 35}}>
          {children}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

function Tabs() {
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 55,
            paddingHorizontal: 5,
            paddingTop: 0,
            backgroundColor: '#D7E1DF',
            borderTopWidth: 1,
            borderTopColor: '#cddad7',
          },
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={styles.buttonWrapper}>
                <Image
                  source={require('../assets/hut.png')}
                  style={styles.homeButton}
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
                style={styles.scanButton}
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
              <View style={styles.buttonWrapper}>
                <Image
                  source={require('../assets/settings.png')}
                  style={styles.settingsButton}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
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
  scanButtonCircle: {
    top: '-30%',
    borderRadius: 75,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    width: 50,
    height: 50,
    top: -36,
    resizeMode: 'contain',
  },
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#60dbfd',
    padding: 30,
    paddingBottom: 6,
    paddingTop: 6,
    borderRadius: 20,
  },
  homeButton: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  settingsButton: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  line: {
    height: 3,
  },
});

export default Tabs;
