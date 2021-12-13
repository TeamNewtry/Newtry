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
      );
      return res;
      // navigation.navigate('ProductView', {gtin: productIds[2]})
    }
  };
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
        onSubmitEditing={() => {
          updateSearchEntries(searchQuery).catch(error =>
            //code: not found
            console.error('Error in updateSearchEntries:', error),
          );
        }}
        placeholder={'Search for products'}
      />
      <View id={'searchbarContainer'} />
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
    fontSize: 20,
    paddingTop: 200,
    paddingBottom: 5,
  },
  searchbar: {
    padding: 2,
  },
});
