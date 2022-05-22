import React, {useContext, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {getProductByGTIN, searchProducts} from '../../CloudFunctionsWrapper';
import {Table, TableWrapper, Rows} from 'react-native-table-component';
import RenderIf from '../../components/Renderif';
import {LocalizationContext} from '../../components/Translations';

const HomeScreen = ({navigation, route}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchTrue, setSearchTrue] = React.useState(false);
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  initializeAppLanguage();
  const [tableData, setTableData] = React.useState([
    ['', translations['searchbar.loading.text'], ''],
  ]);

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

  const submitData = () => {
    setTableData([['', translations['searchbar.loading.text'], '']]);
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
      .catch(error => {
        setTableData([['', translations['searchbar.error.text'], '']]);
        console.log(`Error: ${error}`);
      });
  };

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
    setTableData([['', translations['searchbar.loading.text'], '']]);
    setSearchQuery('');
  };
  const updateSearchEntries = async query => {
    const productIds = await searchProducts({gtinOrName: query});
    return await Promise.all(
      productIds.map(async item => {
        return await getProductByGTIN({gtin: item});
      }),
    );
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo_large.png')}
      />
      <SearchBar
        inputStyle={styles.searchbarInput}
        containerStyle={styles.searchbarContainer}
        style={styles.searchbar}
        inputContainerStyle={styles.searchbarInputContainer}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={submitData}
        placeholder={translations['searchbar.placeholder']}
      />

      <View name={'searchTable'}>
        {RenderIf(searchTrue)(
          <Table style={styles.table}>
            <TableWrapper style={styles.wrapper}>
              <Rows
                data={Object.values(tableData)}
                flexArr={[1, 3, 2]}
                resizeMode="contain"
                style={styles.row}
              />
            </TableWrapper>
          </Table>,
        )}
      </View>
      <View>
        {RenderIf(!searchTrue)(
          <Text style={styles.text}>{translations['homeScreen.text']}</Text>,
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
  searchbarInput: {backgroundColor: '#60dbfd', color: 'black'},
  searchbarContainer: {
    backgroundColor: '#60dbfd',
    borderWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 35,
    width: '85%',
    height: 47,
  },
  searchbarInputContainer: {
    backgroundColor: '#60dbfd',
    marginLeft: 8,
    width: '95%',
    height: '100%',
  },
  wrapper: {
    flexDirection: 'row',
    backgroundColor: '#c7f6fb',
    marginTop: -2,
    marginLeft: '-5%',
    width: '110%',
    borderRadius: 35,
    padding: 8,
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
    paddingBottom: 5,
    fontFamily: 'Comfortaa',
  },
  searchbar: {
    padding: 2,
    fontFamily: 'Comfortaa',
  },
});
