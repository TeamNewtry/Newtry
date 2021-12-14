import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Image, ViewBase} from 'react-native';

import Searchbar from '../../components/TextInput.component';

const SettingsScreen = () => {
  const [value, setValue] = useState();
  function updateSearch(value) {
    //search logic or anything
    console.log(value);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Login</Text>

      <Text style={styles.username}>Benutzername</Text>
      <Searchbar value={value} updateSearch={updateSearch} />
      <Text style={styles.password}>Passwort</Text>
      <Searchbar value={value} updateSearch={updateSearch} />

      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>

      <Text style={styles.subTitle}>Abonnement</Text>
      <Text style={styles.subTitle}>5€/Monat</Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
          marginTop: 20,
        }}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>

      <Text style={styles.subTitle}>Sprache</Text>
      <View style={styles.language}>
        <Image
          style={styles.flag}
          source={require('../../assets/germany.png')}
        />
        <Image
          style={styles.flag}
          source={require('../../assets/united-kingdom.png')}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#EAFFFA',
    padding: 15,
    paddingTop: 35,
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headline: {
    width: '100%',
    fontSize: 30,
    marginBottom: 25,
    fontFamily: 'Comfortaa',
  },
  username: {
    width: '100%',
    fontSize: 15,
    marginBottom: 3,
    marginLeft: 12,
    marginTop: 25,
    fontFamily: 'Comfortaa',
  },
  password: {
    width: '100%',
    fontSize: 15,
    marginTop: -35,
    marginBottom: 3,
    marginLeft: 12,
    fontFamily: 'Comfortaa',
  },
  subTitle: {
    width: '100%',
    fontSize: 20,
    marginBottom: 3,
    marginLeft: 12,
    fontFamily: 'Comfortaa',
  },
  language: {
    marginTop: 25,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  flag: {
    width: 70,
    height: 70,
    marginRight: 25,
    marginLeft: 12,
  },
});
