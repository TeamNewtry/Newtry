import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Image, ViewBase} from 'react-native';

import Searchbar from '../../components/Seachbar.component';

const SettingsScreen = () => {
  const [value, setValue] = useState();
  function updateSearch(value) {
    //search logic or anything
    console.log(value);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Login</Text>

      <Text style={styles.text}>Username</Text>
      <Searchbar value={value} updateSearch={updateSearch} />
      <Text style={styles.text}>Password</Text>
      <Searchbar value={value} updateSearch={updateSearch} />

      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>

      <Text style={styles.textPlan}>Plan</Text>
      <Text style={styles.textPlan}>50/month</Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
          marginTop: 20,
        }}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>

      <Text style={styles.textPlan}>Language</Text>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  },
  text: {
    width: '100%',
    fontSize: 15,
    marginBottom: 3,
    marginLeft: 12,
  },
  textPlan: {
    width: '100%',
    fontSize: 20,
    marginBottom: 3,
    marginLeft: 12,
  },
});
