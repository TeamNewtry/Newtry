import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet, Image, ScrollView} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import Unorderedlist from 'react-native-unordered-list';
import {useAsync} from 'react-async';
import {getProductByGTIN} from '../CloudFunctionsWrapper';
import {Icon} from 'react-native-elements';
import {ArrowLeftOutlined} from '@ant-design/icons';

const ProductView = ({navigation, route}) => {
  const {data, error} = useAsync(getProductByGTIN, {
    gtin: route.params.gtin,
  });
  if (typeof data !== 'undefined') {
    const tableHead = [' Average nutritional values', ' per 100g'];
    const nut = data.nutrition;
    const tableData = [
      [' Calories', ` ${nut.calories} kcal`],
      [' Total Fat', ` ${nut.totalFat} g`],
      [' Saturated Fat', ` ${nut.saturatedFat} g`],
      [' Carbohydrates', ` ${nut.carbohydrates} g`],
      [' Total sugar', ` ${nut.sugar} g`],
      [' Protein', ` ${nut.protein} g`],
      [' Salt', ` ${nut.salt} g`],
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
                onPress={() => navigation.navigate('Home', {route})}
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
              <Table borderStyle={{borderWidth: 1}}>
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
              <Text style={styles.title}>Ingredients:</Text>
              {data.ingredients.split(',').map(element => {
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
  wrapper: {flexDirection: 'row'},
  title: {
    fontSize: 20,
    paddingTop: 10,
    fontWeight: 'bold',
    fontFamily: 'Comfortaa',
  },
  textContainer: {marginTop: 10, marginBottom: 10},
  row: {height: 40},
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
