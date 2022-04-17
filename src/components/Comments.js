import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Comments = () => {
  let [listData, setListData] = useState([]);

  useEffect(() => {
    firestore()
      .collection('test/1/comments')
      .get()
      .then(collectionSnapshot => {
        let temp = [];
        collectionSnapshot.forEach(documentSnapshot => {
          const comment = documentSnapshot.data();
          temp.push(comment.comment);
          setListData(temp);
        });
      });
  }, []);

  console.log(listData);

  let itemView = ({item}) => {
    return (
      <View
        key={item.name}
        style={{
          backgroundColor: 'white',
          padding: 20,
        }}>
        <Text>Kommentar: {item}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList data={listData} renderItem={itemView} />
    </View>
  );
};

export default Comments;
