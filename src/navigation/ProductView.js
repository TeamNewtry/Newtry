import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Row, Rows, Table, TableWrapper,} from 'react-native-table-component';
import Unorderedlist from 'react-native-unordered-list';
import {useAsync} from 'react-async';
import {getProductByGTIN} from '../CloudFunctionsWrapper';
import {Icon} from 'react-native-elements';

const splitIngredients = ingredients => {
  ingredients = ingredients ?? '';
  const regex = /[^,([]+([([].*?[)\]]+)?/g;
  const results = [...ingredients.matchAll(regex)];
  return results
    .map(result => result[0].trim())
    .filter(result => result.length > 1);
};

const ProductView = ({navigation, route}) => {
  const {data, error} = useAsync(getProductByGTIN, {
    gtin: route.params.gtin,
  });
  if (typeof data !== 'undefined') {
    const tableHead = [' Durchschnittliche Nährwerte', ' pro 100g'];
    const nut = data.nutrition;
    const tableData = [
      [' Kalorien', ` ${nut.calories} kcal`],
      [' Fett', ` ${nut.totalFat} g`],
      [' Gesättigte Fettsäuren', ` ${nut.saturatedFat} g`],
      [' Kohlenhydrate', ` ${nut.carbohydrates} g`],
      [' Zucker', ` ${nut.sugar} g`],
      [' Protein', ` ${nut.protein} g`],
      [' Salz', ` ${nut.salt} g`],
    ];

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imageBorder}>
            <View>
              <Icon
                name={'arrow-left'}
                size={20}
                reverse={true}
                type={'font-awesome'}
                onPress={() => navigation.navigate('HomeScreen', {route})}
                reverseColor={'black'}
                color={'transparent'}
              />
            </View>
            <Image
              source={{uri: data.pictures.toString()}}
              style={styles.image}
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
              <Text style={styles.title}>Zutaten:</Text>
              {splitIngredients(data.ingredients).map(element => {
                return (
                  <Unorderedlist key={element}>
                    <Text style={styles.description}>{element}</Text>
                  </Unorderedlist>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return <View />;
  }
};

export default ProductView;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#EAFFFA'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
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
  imageBorder: {
    borderBottomWidth: 3,
    borderBottomColor: '#03936f',
    paddingBottom: 0,
  },
});
