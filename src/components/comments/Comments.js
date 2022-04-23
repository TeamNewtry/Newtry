import React, {useEffect, useReducer, useState, useContext} from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import WriteComment from './WriteComment';
import LinearGradient from 'react-native-linear-gradient';
import {LocalizationContext} from '../../components/Translations';

const Comments = props => {
  const {translations} = useContext(LocalizationContext);
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
      <View key={item.name} style={styles.comment}>
        <View style={styles.commentHeader}>
          <Text style={styles.font}>{item.userName}</Text>
          <Text style={styles.font}>Rating: {item.productRating}/5</Text>
        </View>
        <Text style={styles.text}>{item.comment}</Text>
      </View>
    );
  };

  return (
    <View>
      <WriteComment productId={props.productId} updateComments={forceUpdate} />
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}
        colors={['#24FF00', '#00D8D4', '#60dbfd']}
        style={{height: 2}}
      />
      <FlatList data={listData} renderItem={itemView} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  font: {
    fontFamily: 'Comfortaa',
  },
  comment: {
    marginBottom: 5,
    marginTop: 5,
    fontFamily: 'Comfortaa',
    padding: 10,
    borderRadius: 20,
  },
  text: {
    backgroundColor: 'rgb(246, 246, 247)',
    borderRadius: 20,
    padding: 15,
    marginTop: 15,
    fontFamily: 'Comfortaa',
  },
  commentHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default Comments;
