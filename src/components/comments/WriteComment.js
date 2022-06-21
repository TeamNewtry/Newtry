import React, {useState, useContext} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../Authentication';
import {Icon} from 'react-native-elements';
import {LocalizationContext} from '../Translations';
import {Rating} from 'react-native-ratings';

const WriteComment = props => {
  const {translations} = useContext(LocalizationContext);
  const [comment, setComment] = useState('');
  const {user, setUser} = useContext(AuthContext);
  const [rating, setRating] = useState(0);

  const delay = ms => new Promise(res => setTimeout(res, ms));

  async function refreshComments() {
    try {
      await delay(500);
      props.updateComments();
    } catch (err) {
      console.log(err);
    }
  }

  const handleComment = () => {
    if (user === null) {
      console.log('user not signed in');
      Alert.alert(
        translations['customerRating.user.error.title'],
        translations['customerRating.user.error.text'],
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: translations['customerRating.user.error.confirm'],
            onPress: () => console.log('TODO: redirect to login'),
          },
        ],
      );
      return;
    }

    const data = {
      comment: comment,
      userName: user.displayName,
      // userPic: user.photoURL,
      productRating: rating,
    };

    if (rating > 0) {
      firestore()
        .doc(`comments/${props.productId}`)
        .get()
        .then(docSnapshot => {
          if (docSnapshot.exists) {
            firestore()
              .collection(`comments/${props.productId}/comments`)
              .add(data);
            firestore()
              .doc(`comments/${props.productId}`)
              .update({
                rating: firestore.FieldValue.increment(rating),
                count: firestore.FieldValue.increment(1),
              });
          } else {
            firestore()
              .collection('comments')
              .doc(`${props.productId}`)
              .set({});
            firestore().doc(`comments/${props.productId}`).set({
              rating: rating,
              count: 1,
            });
            firestore()
              .collection(`comments/${props.productId}/comments`)
              .add(data);
          }
        });
    } else {
      console.log('Please enter a rating');
    }
    setRating(0);
    setComment();
    refreshComments();
  };

  return (
    <View style={styles.container}>
      <Rating
        type="custom"
        ratingColor="#f1c40f"
        ratingBackgroundColor="#a5b3af"
        tintColor="#EAFFFA"
        startingValue={rating}
        ratingCount={5}
        minValue={1}
        imageSize={30}
        onFinishRating={rating => setRating(rating)}
        style={styles.rating}
      />

      <TextInput
        placeholder={translations['comment.placeholder']}
        onChangeText={input => setComment(input)}
        maxLength={225}
        numberOfLines={5}
        multiline={true}
        style={styles.textInput}
        value={comment}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => handleComment()}>
        <Icon name={'check'} size={25} type={'font-awsome'} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  rating: {
    paddingRight: 200,
    paddingBottom: 15,
  },
  container: {
    flex: 1,
  },
  textInput: {
    backgroundColor: 'rgb(246, 246, 247)',
    borderRadius: 20,
    textAlignVertical: 'top',
    padding: 15,
    marginBottom: 10,
    fontFamily: 'Comfortaa',
  },
  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00C2FF',
    height: 30,
    width: 80,
    borderRadius: 20,
    marginRight: 0,
    marginLeft: 'auto',
    marginBottom: 20,
  },
});

export default WriteComment;
