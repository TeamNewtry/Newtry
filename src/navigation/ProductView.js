import React, {useContext} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Row, Rows, Table, TableWrapper} from 'react-native-table-component';
import Unorderedlist from 'react-native-unordered-list';
import {useAsync} from 'react-async';
import {getProductByGTIN} from '../CloudFunctionsWrapper';
import {Icon} from 'react-native-elements';
import {LocalizationContext} from '../components/Translations';
import LinearGradient from 'react-native-linear-gradient';
import NutritionTable from '../components/NutritionTable';
import IngredientList from '../components/IngredientList';
import DetailPage from '../components/DetailPage';

const ProductView = ({navigation, route}) => {
  const {translations} = useContext(LocalizationContext);
  const {data, error} = useAsync(getProductByGTIN, {
    gtin: route.params.gtin,
  });
  console.log(JSON.stringify(data));
  if (typeof data !== 'undefined') {
    const page = (
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
          <NutritionTable data={data.nutrition} />
          <IngredientList data={data.ingredients} />
        </View>
      </ScrollView>
    );
    return DetailPage({navigation, route}, page);
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
