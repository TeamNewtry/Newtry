import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';

let nav;

const onBarcodeRead = e => {
  const barcodeValue = e.data;
  nav.navigate('ProductView', {gtin: barcodeValue});
};

const ScanScreen = ({navigation}) => {
  nav = navigation;

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onBarCodeRead={onBarcodeRead}>
        {({status}) => {
          if (status !== 'READY') {
            return <Text>Camera loading...</Text>;
          }
          return (
            <View
              style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
              <Text>💚</Text>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

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
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default ScanScreen;
