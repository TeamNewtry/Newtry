import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

// import Searchbar from '../../components/Seachbar.component';
import {SearchBar} from 'react-native-elements';
import {getProductByGTIN, searchProducts} from '../../CloudFunctionsWrapper';

const HomeScreen = ({navigation, route}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const updateSearchEntries = async query => {
    const productIds = await searchProducts({gtinOrName: query});
    if (productIds.length > 0) {
      let res = await Promise.all(
        productIds.map(async item => {
          console.log(item);
          return await getProductByGTIN({gtin: item});
        }),
        navigation.navigate('ProductView', {gtin: productIds[0]}),
      );
      return res;
    }
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo_large.png')}
      />
      <SearchBar
        inputStyle={{backgroundColor: '#60dbfd', color: 'black'}}
        containerStyle={{
          backgroundColor: '#60dbfd',
          borderWidth: 1,
          borderRadius: 35,
          width: '85%',
          height: 67,
        }}
        style={styles.searchbar}
        inputContainerStyle={{backgroundColor: '#60dbfd'}}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={() => {
          updateSearchEntries(searchQuery).catch(error =>
            //code: not found
            console.error('Error in updateSearchEntries:', error),
          );
        }}
        placeholder={'Search for products'}
      />
      <View nativeID={'searchbarContainer'} />
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
    height: 200,
    width: 300,
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'center',
    fontSize: 22,
    padding: 40,
    marginTop: '25%',
    paddingBottom: 5,
    fontWeight: '600',
  },
  searchbar: {
    padding: 2,
  },
});
