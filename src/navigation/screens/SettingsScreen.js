import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Button, StyleSheet, Image, ScrollView} from 'react-native';
import {Avatar, ListItem, Icon} from 'react-native-elements';
import Searchbar from '../../components/TextInput.component';
import {LocalizationContext} from '../../components/Translations';
import {AuthContext} from '../../components/Authentication';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

const LoginView = () => {
  const [signingIn, setSigningIn] = useState(false);
  const {translations} = useContext(LocalizationContext);
  const {user, setUser} = useContext(AuthContext);

  const onGoogleSignIn = async () => {
    setSigningIn(true);
    console.log('Signing in with Google...');
    try {
      const {idToken} = await GoogleSignin.signIn();
      console.log('ID-Token:');
      console.log(idToken);
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log('Google-Cred:');
      console.log(googleCredential);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      setUser(userCredential.user);
      console.log('Signed in with Google!');
      console.log(user);
    } catch (ex) {
      console.log('Error on Google Sign-in:');
      console.log(ex);
    }
    setSigningIn(false);
  };

  const onGithubSignIn = () => {
    return null;
  };

  const onLogout = () => {
    console.log('Signing out...');
    auth().signOut();
    console.log('Signed out!');
  };

  if (!user) {
    // show login buttons
    return (
      <View>
        <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleSignIn}
          disabled={signingIn}
        />
        <Button
          title={translations['settings.login.github']}
          onPress={onGithubSignIn}
        />
      </View>
    );
  } else {
    // show login info
    return (
      <View>
        <Text style={styles.subTitle}>
          {`${translations['settings.login.status']} ${user.providerId}: ${user.displayName} (${user.email})`}
        </Text>
        <Text style={styles.subTitle}>
          {`${translations['settings.login.email_verified']} ${user.emailVerified}`}
        </Text>
        <Text style={styles.subTitle}>
          {`${translations['settings.login.anonymous']} ${user.isAnonymous}`}
        </Text>
        <Button
          title={translations['settings.login.logout']}
          onPress={onLogout}
        />
      </View>
    );
  }
};

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

      {LoginView()}

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
