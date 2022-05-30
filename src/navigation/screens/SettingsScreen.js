import React, {useState, useContext} from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import {ListItem} from 'react-native-elements';
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
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      setUser(userCredential.user);
      console.log('Signed in with Google!');
      console.log(userCredential);
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
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onGoogleSignIn}
        disabled={signingIn}
      />
    );
  } else {
    // show login info
    return (
      <View>
        <Text style={styles.subTitle}>
          {`${translations['settings.login.status']} ${user.displayName} (${user.email})`}
        </Text>
        <Button
          color="#60dbfd"
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

  const {translations, setAppLanguage} = useContext(LocalizationContext);

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>{translations['settings.login.text']}</Text>

      {LoginView()}

      <View style={styles.separator} />

      <Text style={styles.subTitle}>
        {translations['settings.subscription']}
      </Text>
      <Text style={styles.subTitle}>
        {translations['settings.paymentPlan']}
      </Text>

      <View style={styles.separator} />

      <View>
        <Text style={styles.subTitle}>
          {translations['settings.change_language']}
        </Text>
        {translations.getAvailableLanguages().map((currentLang, i) => (
          <ListItem
            key={i}
            containerStyle={styles.chooseLanguage}
            onPress={() => {
              setAppLanguage(currentLang);
            }}>
            <ListItem.Content>{language(currentLang)}</ListItem.Content>
            {/* {appLanguage === currentLang ? (
              <Icon name="check" size={20} />
            ) : null} */}
          </ListItem>
        ))}
      </View>
    </View>
  );
};

export default SettingsScreen;

const language = currentLang => {
  if (currentLang === 'en') {
    return (
      <View style={styles.label}>
        <Image
          style={styles.flag}
          source={require('../../assets/united-kingdom.png')}
        />
        <Text style={styles.labelText}>English</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.label}>
        <Image
          style={styles.flag}
          source={require('../../assets/germany.png')}
        />
        <Text style={styles.labelText}>German</Text>
      </View>
    );
  }
};

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
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  subTitle: {
    width: '100%',
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 12,
    fontFamily: 'Comfortaa',
  },
  chooseLanguage: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  flag: {
    width: 70,
    height: 70,
  },
  label: {
    flexDirection: 'row',
  },
  labelText: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 20,
    fontFamily: 'Comfortaa',
    fontSize: 18,
  },
});
