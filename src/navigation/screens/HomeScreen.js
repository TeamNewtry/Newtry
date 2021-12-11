import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Image, ViewBase} from 'react-native';

// import Searchbar from '../../components/Seachbar.component';
import {SearchBar} from 'react-native-elements';
const HomeScreen = ({navigation, route}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo_large.png')}
      />
      <SearchBar
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{
          backgroundColor: 'white',
          borderWidth: 1,
          borderRadius: 5,
          width: '80%',
        }}
        style={styles.searchbar}
        inputContainerStyle={{backgroundColor: 'white'}}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={() =>
          navigation.navigate('ProductView', {gtin: searchQuery})
        }
        placeholder={'Search for products'}
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
    padding: 2,
  },
});
