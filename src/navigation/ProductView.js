import React, {useContext} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useAsync} from 'react-async';
import {getProductByGTIN} from '../CloudFunctionsWrapper';
import {LocalizationContext} from '../components/Translations';
import LinearGradient from 'react-native-linear-gradient';
import NutritionTable from '../components/NutritionTable';
import IngredientList from '../components/IngredientList';
import DetailPage from '../components/DetailPage';
import CustomerRating from '../components/CustomerRating';
import Comments from '../components/comments/Comments';

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
            <View styles={styles.textContainer}>
              <Text style={styles.title}>{data.name}</Text>
              <View style={styles.climateRating}>
                {data.climateRating == null ? (
                  <Text style={styles.climateRatingText}>?</Text>
                ) : (
                  <Text style={styles.climateRatingText}>
                    {data.climateRating}
                  </Text>
                )}
                <Text style={styles.climateRatingLabel}>ECO</Text>
              </View>
            </View>
            <Text style={styles.gtin}>GTIN: {data.gtin}</Text>
            <Text />
            <Text style={styles.description}>{data.description}</Text>
          </View>
          <NutritionTable data={data.nutrition} />
          <IngredientList data={data.ingredients} />
        </View>
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: 0, y: 0}}
          colors={['#24FF00', '#00D8D4', '#60dbfd']}
          style={styles.line}
        />

        <View style={styles.padding}>
          <Text style={styles.subTitle}>
            {translations['customerrating.header']}
          </Text>
          <CustomerRating productId={data.gtin} />
        </View>
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: 0, y: 0}}
          colors={['#24FF00', '#00D8D4', '#60dbfd']}
          style={styles.line}
        />

        <View style={styles.padding}>
          <Text style={styles.subTitle}>{translations['rating.header']}</Text>
          <Comments productId={data.gtin} />
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
  wrapper: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    paddingTop: 10,
    fontFamily: 'Comfortaa',
  },
  subTitle: {
    fontSize: 16,
    paddingBottom: 20,
    fontFamily: 'Comfortaa',
  },
  textContainer: {marginTop: 10, marginBottom: 10},
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
    height: 2,
  },
  backArrow: {
    position: 'absolute',
    zIndex: 10,
    top: 5,
    left: 5,
  },
  climateRating: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 100,
    top: -70,
    right: 5,
    backgroundColor: '#00C2FF',
    justifyContent: 'center',
  },
  climateRatingText: {
    textAlign: 'center',
    fontFamily: 'Comfortaa',
    color: 'white',
    fontSize: 40,
    top: 1,
  },
  climateRatingLabel: {
    fontSize: 8,
    textAlign: 'center',
    color: 'white',
    top: -3,
  },
});
