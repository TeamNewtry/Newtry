import {NativeModules} from 'react-native';
NativeModules.ReactLocalization = {
  language: 'en',
};

NativeModules.RNGoogleSignin = {
  SIGN_IN_CANCELLED: 0,
  configure: () => {},
};
NativeModules.RNFBAppModule = {};
NativeModules.RNFBAnalyticsModule = {
  logEvent: () => {},
};
NativeModules.RNFBAppModule = {
  NATIVE_FIREBASE_APPS: [
    {
      appConfig: {
        name: '[DEFAULT]',
      },
      options: {},
    },

    {
      appConfig: {
        name: 'secondaryFromNative',
      },
      options: {},
    },
  ],
  FIREBASE_RAW_JSON: '{}',
  addListener: () => {},
  eventsAddListener: () => {},
  eventsNotifyReady: () => {},
  removeListeners: () => {},
};
NativeModules.RNFBAuthModule = {
  APP_LANGUAGE: {
    '[DEFAULT]': 'en-US',
  },
  APP_USER: {
    '[DEFAULT]': 'jestUser',
  },
  addAuthStateListener: () => {},
  addIdTokenListener: () => {},
  useEmulator: () => {},
};
NativeModules.RNFBCrashlyticsModule = {};
NativeModules.RNFBDatabaseModule = {
  on: () => {},
  useEmulator: () => {},
};
NativeModules.RNFBFirestoreModule = {
  settings: () => {},
  documentSet: () => {},
};
NativeModules.RNFBMessagingModule = {
  onMessage: () => {},
};
NativeModules.RNFBPerfModule = {};
NativeModules.RNFBStorageModule = {
  useEmulator: () => {},
};

