import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../res/colors';
import FavoritesEmptyState from './FavoritesEmptyState';
import storage from '../../libs/storage';
import CoinsItem from '../coins/CoinsItem';
import {FlatList} from 'react-native-gesture-handler';

const FavoritesScreen = (props) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const data = await storage.getAllKeys();

        if (data.error) {
          return console.log('favorites getfavorites error');
        }

        const keys = data.data.filter((key) => key.includes('favorite-'));
        const favs = await storage.multiGet(keys);
        const favorites = favs.data.map((fav) => JSON.parse(fav[1]));
        setFavorites(favorites);
      } catch (e) {
        console.log('favorites getfavorites e', e);
      }
    };
    getFavorites();
    const unsubscribe = props.navigation.addListener('focus', () => {
      getFavorites();
    });
    return unsubscribe;
  }, []);

  const handlePress = (coin) => {
    props.navigation.navigate('CoinDetail', {coin});
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <FavoritesEmptyState />
      ) : (
        <FlatList
          data={favorites}
          renderItem={({item}) => (
            <CoinsItem item={item} onPress={() => handlePress(item)} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charade,
    flex: 1,
  },
});

export default FavoritesScreen;
