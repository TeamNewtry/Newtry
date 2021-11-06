/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

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

class App extends Component {
  state = {
    name1: 'Resolving...',
    name2: 'Resolving...',
  };

  constructor(props) {
    super(props);
    this.subscriber1 = firestore()
      .collection('test')
      .doc('1')
      .onSnapshot(doc => {
        this.setState({
          name1: doc.data().name,
          name2: this.state.name2,
        });
      });
    this.subscriber2 = firestore()
      .collection('test')
      .doc('2')
      .onSnapshot(doc => {
        this.setState({
          name1: this.state.name1,
          name2: doc.data().name,
        });
      });
  }

  render() {
    return (
      <View style={{backgroundColor: Colors.black}}>
        <Section title="Section 1">
          This is <Text style={styles.highlight}>Section 1</Text>.
        </Section>
        <Section title="Doc 1">Name: {this.state.name1}</Section>
        <Section title="Doc 2">Name: {this.state.name2}</Section>
      </View>
    );
  }
}

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
});

export default App;
