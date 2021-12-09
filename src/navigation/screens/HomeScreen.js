import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Image, ViewBase} from 'react-native';

import Searchbar from '../../components/Seachbar.component';

const HomeScreen = () => {
  // eslint-disable-next-line no-undef
  const [value, setValue] = useState();
  function updateSearch(value) {
    //search logic or anything
    console.log(value);
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo_large.png')}
      />

      <Searchbar
        style={styles.searchbar}
        value={value}
        updateSearch={updateSearch}
      />
      <View>
        <Text style={styles.text}>
          Welcome to Newtry! {'\n'}
          {'\n'}
          Try shopping the new way. {'\n'}
          {'\n'}
          Scan or search the products and you’ll see everything you need to know
          💚
        </Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EAFFFA',
    justifyContent: 'flex-start',
  },
  logo: {
    height: '60%',
    width: '60%',
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    padding: 5,
  },
  searchbar: {
    width: '90%',
  },
});
