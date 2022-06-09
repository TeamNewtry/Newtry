import {Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import resetScreen from '../navigation/screens/HomeScreen';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const NavigationImage = data => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProductView', {gtin: data.gtin});
        setTimeout(function () {
          resetScreen();
        }, 50);
      }}>
      <View>
        <Image style={styles.buttonImage} source={{uri: data.value}} />
      </View>
    </TouchableOpacity>
  );
};

export default NavigationImage;

const styles = StyleSheet.create({
  buttonImage: {
    width: 45,
    height: 45,
    overflow: 'hidden',
    resizeMode: 'contain',
  },
});
