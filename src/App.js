/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import firestore from '@react-native-firebase/firestore';

const Section = ({children, title}): Node => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, {color: Colors.white}]}>{title}</Text>
      <Text style={[styles.sectionDescription, {color: Colors.light}]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const [name, setName] = React.useState('Retrieving...');
  const [age, setAge] = React.useState('0');

  let doc1 = firestore().collection('test').doc('1');

  // init live update of name & age
  let subscriber = doc1.onSnapshot(doc => {
    let data = doc.data();
    setName(data.name);
    setAge(data.age);
  });

  const onChangeName = name => onChangeInfo(name, false);
  const onChangeAge = name => onChangeInfo(name, true);
  const onChangeInfo = (info, isAge) => {
    doc1.update({name: isAge ? name : info, age: isAge ? info : age}).done();
  };

  return (
    <View style={{backgroundColor: Colors.black}}>
      <Section title="Doc 'test'">
        Name: <Text style={styles.highlight}>{name}</Text> {'\n'}
        Age: <Text style={styles.highlight}>{age}</Text>
      </Section>
      <Section title="Tell me more about you...">
        ...in the following form
      </Section>
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="Margarete"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeAge}
        value={age.toString()}
        placeholder="44 oder doch 13½"
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: Colors.light,
    padding: 10,
  },
});

export default App;
