import {Text, View, StyleSheet} from 'react-native';
import Unorderedlist from 'react-native-unordered-list';
import React, {useContext} from 'react';
import {LocalizationContext} from './Translations';

const splitIngredients = ingredients => {
  ingredients = ingredients ?? '';
  const regex = /[^,([]+([([].*?[)\]]+)?/g;
  const results = [...ingredients.matchAll(regex)];
  return results
    .map(result => result[0].trim())
    .filter(result => result.length > 1);
};
const IngredientList = ing => {
  const {translations} = useContext(LocalizationContext);
  return (
    <View>
      <Text style={styles.title}>
        {translations['nutrition.ingredients.header']}
      </Text>
      {splitIngredients(ing.data).map(element => {
        return (
          <Unorderedlist key={element}>
            <Text style={styles.description}>{element}</Text>
          </Unorderedlist>
        );
      })}
    </View>
  );
};

export default IngredientList;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingTop: 10,
    fontFamily: 'Comfortaa',
  },
  description: {
    fontSize: 14,
    paddingBottom: 1,
    fontFamily: 'Comfortaa',
  },
});
