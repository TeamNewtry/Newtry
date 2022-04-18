import React, {useState, useContext} from 'react';
import {View, TextInput, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../Authentication';

const WriteComment = props => {
  let [comment, setComment] = useState('');
  const {user, setUser} = useContext(AuthContext);
  let [rating, setRating] = useState();

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
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 35,
      }}>
      <TextInput
        placeholder="Enter Rating"
        onChangeText={rating => setRating(rating)}
        maxLength={1}
        keyboardType="numeric"
        style={{padding: 10}}
        value={rating}
      />
      <TextInput
        placeholder="Enter Comment"
        onChangeText={comment => setComment(comment)}
        maxLength={225}
        numberOfLines={5}
        multiline={true}
        style={{textAlignVertical: 'top', padding: 10}}
        value={comment}
      />
      <Button
        title="Submit"
        style={{
          alignItems: 'center',
          backgroundColor: '#03A89E',
          color: '#ffffff',
          padding: 10,
          height: 40,
          marginVertical: 10,
        }}
        onPress={() => handleComment()}
      />
    </View>
  );
};

export default WriteComment;
