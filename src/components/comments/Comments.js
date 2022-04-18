import React, {useEffect, useReducer, useState} from 'react';
import {FlatList, Text, View, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import WriteComment from './WriteComment';

const Comments = props => {
  let [listData, setListData] = useState([]);
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    firestore()
      .collection(`comments/${props.productId}/comments`)
      .get()
      .then(collectionSnapshot => {
        let temp = [];
        collectionSnapshot.forEach(documentSnapshot => {
          const comment = documentSnapshot.data();
          temp.push(comment);
          setListData(temp);
        });
      });
  }, [props.productId, reducerValue]);

  let itemView = ({item}) => {
    return (
      <View
        key={item.name}
        style={{
          backgroundColor: 'white',
          padding: 20,
        }}>
        <Text>Name: {item.userName}</Text>
        <Text>Rating: {item.productRating}</Text>
        <Text>Kommentar: {item.comment}</Text>
      </View>
    );
  };

  return (
    <View>
      <WriteComment productId={props.productId} updateComments={forceUpdate} />
      <FlatList data={listData} renderItem={itemView} />
    </View>
  );
};

export default Comments;
