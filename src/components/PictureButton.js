import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from '@types/react';
import resetScreen from '../navigation/screens/HomeScreen';

export const addNavigation = component => {
  <TouchableOpacity
    onPress={() => {
      navigation.navigate('ProductView', {gtin: gtin});
      setTimeout(function () {
        resetScreen();
      }, 50);
    }}>
    <View>{component}</View>
  </TouchableOpacity>;
};
const addText = text => <Text>{text}</Text>;
const newCOmp = addNavigation(addText('Hello world'));

// const addEverything = (text, comp) => {
//   <TouchableOpacity
//     onPress={() => {
//       navigation.navigate('ProductView', {gtin: gtin});
//       setTimeout(function () {
//         resetScreen();
//       }, 50);
//     }}>
//     <View>
//       <comp>{text}</comp>
//     </View>
//   </TouchableOpacity>;
// };
