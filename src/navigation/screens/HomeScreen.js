import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import {SearchBar} from 'react-native-elements';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo_large.png')}
      />
      <Text style={styles.text}>
        Welcome to Newtry! {'\n'}
        {'\n'}
        Try shopping the new way. {'\n'}
        {'\n'}
        Scan or search the products and you’ll see everything you need to know
        💚
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#EAFFFA',
  },
  logo: {
    maxWidth: '60%',
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    padding: 25,
  },
});
