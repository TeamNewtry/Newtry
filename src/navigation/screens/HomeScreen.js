import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {getProductByGTIN, searchProducts} from '../../CloudFunctionsWrapper';
import {Table, TableWrapper, Row, Rows} from 'react-native-table-component';
import renderIf from './../../components/renderif';

const HomeScreen = ({navigation, route}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [tableData, setTableData] = React.useState([
    ['', 'Keine Ergebnisse gefunden', ''],
  ]);
  const [searchTrue, setSearchTrue] = React.useState(false);

  const elementButton = (value, gtin) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProductView', {gtin: gtin});
        setTimeout(function () {
          resetScreen();
        }, 50);
      }}>
      <View>
        <Text>{value}</Text>
      </View>
    </TouchableOpacity>
  );

  const pictureButton = (value, gtin) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProductView', {gtin: gtin});
        setTimeout(function () {
          resetScreen();
        }, 50);
      }}>
      <View>
        <Image style={styles.buttonImage} source={{uri: value}} />
      </View>
    </TouchableOpacity>
  );
  const resetScreen = () => {
    setSearchTrue(false);
    setTableData([['', 'Keine Ergebnisse gefunden', '']]);
    setSearchQuery('');
  };
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
          setSearchTrue(true);
          updateSearchEntries(searchQuery)
            .then(result => {
              const r = result.map(res => {
                return [
                  pictureButton(res.pictures.toString(), res.gtin),
                  elementButton(res.name, res.gtin),
                  elementButton(res.gtin, res.gtin),
                ];
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

      <View name={'searchTable'}>
        {renderIf(searchTrue)(
          <Table style={styles.table}>
            <TableWrapper style={styles.wrapper}>
              <Rows
                data={Object.values(tableData)}
                flexArr={[1, 3, 1]}
                resizeMode="contain"
                style={styles.row}
              />
            </TableWrapper>
          </Table>,
        )}
      </View>
      <View>
        {renderIf(!searchTrue)(
          <Text style={styles.text}>
            Welcome to Newtry! {'\n'}
            {'\n'}
            Try shopping the new way. {'\n'}
            {'\n'}
            Scan or search the products and you’ll see everything you need to
            know 💚
          </Text>,
        )}
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
  table: {
    padding: 2,
    width: 300,
  },
  buttonImage: {
    width: 45,
    height: 45,
    overflow: 'hidden',
    resizeMode: 'contain',
  },
  wrapper: {
    flexDirection: 'row',
  },
  row: {
    height: 50,
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
    marginTop: '18%',
    paddingBottom: 5,
    fontWeight: '600',
  },
  searchbar: {
    padding: 2,
  },
});
