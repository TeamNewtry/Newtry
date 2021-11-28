import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo_large.png')}
      />
      <Text>Home Screen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#EAFFFA',
  },
  logo: {
    maxWidth: '60%',
    resizeMode: 'contain',
  },
});
