/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {getProductByGTIN, searchProducts} from '../../CloudFunctionsWrapper';
import {Table, TableWrapper, Row, Rows} from 'react-native-table-component';

const HomeScreen = ({navigation, route}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [tableData, setTableData] = React.useState([
    '',
    'Keine Ergebnisse gefunden',
    '',
  ]);

  const updateSearchEntries = async query => {
    const productIds = await searchProducts({gtinOrName: query});
    if (productIds.length > 0) {
      return await Promise.all(
        productIds.map(async item => {
          return await getProductByGTIN({gtin: item});
        }),
        // navigation.navigate('ProductView', {gtin: productIds[0]}),
      );

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
        inputStyle={{
          backgroundColor: '#60dbfd',
          color: 'black',
        }}
        containerStyle={{
          backgroundColor: '#60dbfd',
          borderWidth: 0,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          borderRadius: 35,
          width: '85%',
          height: 50,
        }}
        style={styles.searchbar}
        inputContainerStyle={{
          backgroundColor: '#60dbfd',
          width: '94%',
          marginLeft: '3%',
          height: '100%',
        }}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={() => {
          updateSearchEntries(searchQuery)
            .then(result => {
              const r = result.map(res => {
                return [res.pictures.toString(), res.name, res.gtin];
              });
              setTableData(r);
            })
            .catch(error =>
              //code: not found
              console.error('Error in updateSearchEntries:', error),
            );
        }}
        placeholder={'Search for products'}
      />

      <View>
        <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
          <TableWrapper style={styles.wrapper}>
            {/*<Rows*/}
            {/*  data={[['1', '2', '3']]}*/}
            {/*  flexArr={[1, 3, 1]}*/}
            {/*  resizeMode="contain"*/}
            {/*  style={styles.row}*/}
            {/*/>*/}
          </TableWrapper>
        </Table>
      </View>
      <View>
        <Text style={styles.text}>
          Willkommen bei Newtry! {'\n'}
          {'\n'}
          Probiere das Einkaufen auf eine neue Art und Weise. {'\n'}
          {'\n'}
          Scanne oder suche Produkte und du wirst alles herausfinden, was du
          wissen musst. 💚
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
  wrapper: {flexDirection: 'row'},
  row: {height: 40},
  logo: {
    height: 200,
    width: 300,
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'center',
    fontSize: 22,
    padding: 40,
    paddingBottom: 5,
    fontWeight: '600',
    fontFamily: 'Comfortaa',
  },
  searchbar: {
    padding: 5,
    fontFamily: 'Comfortaa',
  },
});
