import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../res/colors';
import FavoritesEmptyState from './FavoritesEmptyState';

const FavoritesScreen = () => {
  const getFavorites = async () => {
    try {
    } catch (e) {
      console.log('favorites getfavorites error', e);
    }
  };

  return (
    <View style={styles.container}>
      <FavoritesEmptyState />
      <Text>Favorites</Text>
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
