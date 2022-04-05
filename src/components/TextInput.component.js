import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

export default function Searchbar({value, updateSearch, style}) {
  const [query, setQuery] = useState();
  const [error, setError] = useState();
  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchContainer}>
        <TextInput
          value={query}
          placeholder=""
          style={styles.textInput}
          onChangeText={text => {
            var letters = /^$|^[a-zA-Z._\b ]+$/;
            if (text.length > 12) {
              setError('Query too long.');
            }
            if (text.match(letters)) {
              setQuery(text);
              updateSearch(text);
              if (error) {
                setError(false);
              }
            } else {
              setError('Error');
            }
          }}
        />
        {query ? (
          <TouchableOpacity onPress={() => setQuery('')} style={styles.vwClear}>
            <Image
              style={styles.icClear}
              source={require('../assets/close.png')}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.vwClear} />
        )}
      </View>
      {error && <Text style={styles.txtError}>{error}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  txtError: {
    marginTop: '2%',
    width: '89%',
    color: 'white',
  },
  vwClear: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: '#60dbfd',
    flex: 1,
    borderRadius: 15,
    fontFamily: 'Comfortaa',
  },

  vwSearch: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icSearch: {
    height: 15,
    width: 15,
  },
  searchContainer: {
    backgroundColor: '#60dbfd',
    width: '100%',
    height: 35,
    flexDirection: 'row',
    borderColor: '#ccc',
    borderRadius: 55,
    fontSize: 16,
  },
  container: {
    height: 80,
    alignItems: 'center',
  },
});
