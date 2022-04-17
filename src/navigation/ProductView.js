import React, {useContext} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Row, Rows, Table, TableWrapper} from 'react-native-table-component';
import Unorderedlist from 'react-native-unordered-list';
import {useAsync} from 'react-async';
import {getProductByGTIN} from '../CloudFunctionsWrapper';
import {Icon} from 'react-native-elements';
import {LocalizationContext} from '../components/Translations';
import LinearGradient from 'react-native-linear-gradient';
import Comments from '../components/Comments';

const splitIngredients = ingredients => {
  ingredients = ingredients ?? '';
  const regex = /[^,([]+([([].*?[)\]]+)?/g;
  const results = [...ingredients.matchAll(regex)];
  return results
    .map(result => result[0].trim())
    .filter(result => result.length > 1);
};

const ProductView = ({navigation, route}) => {
  const {translations} = useContext(LocalizationContext);
  const {data, error} = useAsync(getProductByGTIN, {
    gtin: route.params.gtin,
  });
  if (typeof data !== 'undefined') {
    const tableHead = [
      translations['nutrition.table.header1'],
      translations['nutrition.table.header2'],
    ];
    const nut = data.nutrition;
    const tableData = [
      [translations['nutrition.table.field1'], ` ${nut.calories} kcal`],
      [translations['nutrition.table.field2'], ` ${nut.totalFat} g`],
      [translations['nutrition.table.field3'], ` ${nut.saturatedFat} g`],
      [translations['nutrition.table.field4'], ` ${nut.carbohydrates} g`],
      [translations['nutrition.table.field5'], ` ${nut.sugar} g`],
      [translations['nutrition.table.field6'], ` ${nut.protein} g`],
      [translations['nutrition.table.field7'], ` ${nut.salt} g`],
    ];

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
        <ScrollView>
          <View style={styles.imageBorder}>
            <Image
              source={{uri: data.pictures.toString()}}
              style={styles.image}
            />
            <LinearGradient
              start={{x: 1, y: 0}}
              end={{x: 0, y: 0}}
              colors={['#24FF00', '#00D8D4', '#60dbfd']}
              style={styles.line}
            />
          </View>
          <View style={styles.padding}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{data.name}</Text>
              <Text style={styles.gtin}>GTIN: {data.gtin}</Text>
              <Text />
              <Text style={styles.description}>{data.description}</Text>
            </View>
            <View>
              <Table borderStyle={{borderWidth: 1, borderColor: 'gray'}}>
                <Row
                  data={tableHead}
                  flexArr={[2, 1]}
                  style={styles.head}
                  textStyle={styles.text}
                />
                <TableWrapper style={styles.wrapper}>
                  <Rows
                    data={tableData}
                    flexArr={[2, 1]}
                    resizeMode="contain"
                    style={styles.row}
                    textStyle={styles.text}
                  />
                </TableWrapper>
              </Table>
            </View>
            <View>
              <Text style={styles.title}>
                {translations['nutrition.ingredients.header']}
              </Text>
              {splitIngredients(data.ingredients).map(element => {
                return (
                  <Unorderedlist key={element}>
                    <Text style={styles.description}>{element}</Text>
                  </Unorderedlist>
                );
              })}
            </View>
          </View>
          <Comments />
        </ScrollView>
      </View>
    );
  } else {
    return <View />;
  }
};

export default ProductView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAFFFA',
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  wrapper: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    paddingTop: 10,
    fontFamily: 'Comfortaa',
  },
  textContainer: {marginTop: 10, marginBottom: 10},
  row: {
    height: 35,
  },
  text: {textAlign: 'left'},
  image: {
    width: window.outerWidth,
    height: 400,
    resizeMode: 'contain',
    backgroundColor: 'rgb(246, 246, 247)',
  },
  description: {
    fontSize: 14,
    paddingBottom: 1,
    fontFamily: 'Comfortaa',
  },
  gtin: {
    fontSize: 10,
    fontFamily: 'Comfortaa',
  },
  padding: {
    padding: 20,
  },
  line: {
    height: 3,
  },
  backArrow: {
    position: 'absolute',
    zIndex: 10,
    top: 5,
    left: 5,
  },
});
