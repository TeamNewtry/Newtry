import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {LocalizationContext} from './Translations';
import {Rating} from 'react-native-ratings';

const CustomerRating = props => {
  let [Data, setData] = useState([]);
  const {translations} = useContext(LocalizationContext);

  useEffect(() => {
    firestore()
      .doc(`comments/${props.productId}`)
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          let temp = [];
          temp.push(docSnapshot.data());
          setData(temp);
        } else {
          setData([{rating: 0, count: 0}]);
        }
      });
  }, [props.productId]);

  return (
    <View>
      {Data.map((postData, idx) => {
        if (postData.count > 0) {
          return (
            <View key={idx}>
              <View style={styles.ratingContainer}>
                <Rating
                  type="custom"
                  ratingColor="#f1c40f"
                  ratingBackgroundColor="#a5b3af"
                  tintColor="#EAFFFA"
                  startingValue={postData.rating / postData.count}
                  fractions={1}
                  imageSize={30}
                  readonly={true}
                />
                <Text style={styles.ratingText}>
                  {(
                    Math.round((postData.rating / postData.count) * 10) / 10
                  ).toFixed(1)}{' '}
                  {translations['ratings.count']}
                </Text>
              </View>

              <Text style={styles.test}>
                {postData.count} {translations['ratings.text']}
              </Text>
            </View>
          );
        } else {
          return (
            <View key={idx}>
              <View style={styles.ratingContainer}>
                <Rating
                  type="custom"
                  ratingColor="#f1c40f"
                  ratingBackgroundColor="#a5b3af"
                  tintColor="#EAFFFA"
                  startingValue={0}
                  fractions={1}
                  imageSize={30}
                  readonly={true}
                />
                <Text style={styles.ratingText}>
                  0 {translations['ratings.count']}
                </Text>
              </View>

              <Text style={styles.test}>0 {translations['ratings.text']}</Text>
            </View>
          );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  rating: {
    paddingRight: 200,
    paddingBottom: 15,
  },
  test: {
    color: '#a5b3af',
    paddingLeft: 25,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  ratingText: {
    fontSize: 15,
    paddingLeft: 25,
    paddingTop: 5,
  },
});

export default CustomerRating;
