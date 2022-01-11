import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Button, StyleSheet, Image, ScrollView} from 'react-native';
import {Avatar, ListItem, Icon} from 'react-native-elements';
import Searchbar from '../../components/TextInput.component';
import {LocalizationContext} from '../../components/Translations';

const SettingsScreen = () => {
  const [value, setValue] = useState();
  function updateSearch(val) {
    //search logic or anything
    console.log(val);
  }
  const {translations, appLanguage, setAppLanguage} =
    useContext(LocalizationContext);
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>{translations['settings.login.text']}</Text>

      <Text style={styles.username}>{translations['settings.username']}</Text>
      <Searchbar value={value} updateSearch={updateSearch} />
      <Text style={styles.password}>{translations['settings.password']}</Text>
      <Searchbar value={value} updateSearch={updateSearch} />

      <View style={styles.topSeparator} />

      <Text style={styles.subTitle}>
        {translations['settings.subscription']}
      </Text>
      <Text style={styles.subTitle}>
        {translations['settings.paymentPlan']}
      </Text>

      <View style={styles.bottomSeparator} />

      <View>
        <Text h4 h4Style={styles.language}>
          {translations['settings.change_language']}
        </Text>
        {translations.getAvailableLanguages().map((currentLang, i) => (
          <ListItem
            key={i}
            bottomDivider
            onPress={() => {
              setAppLanguage(currentLang);
            }}>
            <ListItem.Content>
              <ListItem.Title>{currentLang}</ListItem.Title>
            </ListItem.Content>
            {appLanguage === currentLang ? (
              <Icon name="check" size={20} />
            ) : null}
          </ListItem>
        ))}
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#EAFFFA',
    padding: 15,
    paddingTop: 35,
    textAlign: 'center',
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headline: {
    width: '100%',
    fontSize: 30,
    marginBottom: 25,
    fontFamily: 'Comfortaa',
  },
  topSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  bottomSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  username: {
    width: '100%',
    fontSize: 15,
    marginBottom: 3,
    marginLeft: 12,
    marginTop: 25,
    fontFamily: 'Comfortaa',
  },
  password: {
    width: '100%',
    fontSize: 15,
    marginTop: -35,
    marginBottom: 3,
    marginLeft: 12,
    fontFamily: 'Comfortaa',
  },
  subTitle: {
    width: '100%',
    fontSize: 20,
    marginBottom: 3,
    marginLeft: 12,
    fontFamily: 'Comfortaa',
  },
  language: {
    marginTop: 25,
    marginBottom: 25,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  flag: {
    width: 70,
    height: 70,
    marginRight: 25,
    marginLeft: 12,
  },
});
