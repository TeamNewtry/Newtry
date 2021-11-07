/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const getBlacklistRE = function getBlacklistRE() {
  return /.*[\\]+(android|__tests__|\.idea)[\\]+.*/;
};

module.exports = {
  resolver: {
    blacklistRE: getBlacklistRE(),
  },
};

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
