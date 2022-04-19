import React, {useState, useContext} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../Authentication';
import {Icon} from 'react-native-elements';

const WriteComment = props => {
  let [comment, setComment] = useState('');
  const {user, setUser} = useContext(AuthContext);
  let [rating, setRating] = useState();

  const delay = ms => new Promise(res => setTimeout(res, ms));

  async function refreshComments() {
    await delay(500);
    props.updateComments();
  }

  const handleComment = () => {
    const data = {
      comment: comment,
      userName: user.displayName,
      productRating: rating,
    };
    if (true) {
      //TODO Eingaben überprüfen
      firestore()
        .doc(`comments/${props.productId}`)
        .get()
        .then(docSnapshot => {
          if (docSnapshot.exists) {
            firestore()
              .collection(`comments/${props.productId}/comments`)
              .add(data);
          } else {
            firestore()
              .collection('comments')
              .doc(`${props.productId}`)
              .set({});
            firestore()
              .collection(`comments/${props.productId}/comments`)
              .add(data);
          }
        });
    }
    setRating();
    setComment();
    refreshComments();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Rating"
        onChangeText={rating => setRating(rating)}
        maxLength={1}
        keyboardType="numeric"
        style={styles.textInput}
        value={rating}
      />
      <TextInput
        placeholder="Enter Comment"
        onChangeText={comment => setComment(comment)}
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
