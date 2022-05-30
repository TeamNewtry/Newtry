import React from 'react';
import {Icon} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';

const DetailPage = ({navigation, route}, component) => {
  return (
    <View style={styles.container}>
      <View style={styles.backArrow}>
        <Icon
          name={'arrow-back'}
          size={20}
          reverse={true}
          type={'ionicons'}
          onPress={() => navigation.navigate('HomeScreen', {route})}
          reverseColor={'black'}
          color={'#EAFFFA'}
        />
      </View>
      {component}
    </View>
  );
};

export default DetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAFFFA',
  },

  backArrow: {
    position: 'absolute',
    zIndex: 10,
    top: 5,
    left: 5,
  },
});
