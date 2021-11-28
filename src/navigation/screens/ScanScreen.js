import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';

const ScanScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo_large.png')}
      />
      <Text>Scan Screen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default ScanScreen;

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
