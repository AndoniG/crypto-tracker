import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import Http from '../../libs/http';
import CoinsItem from './CoinsItem';
import Colors from '../../res/colors';
import CoinsSearch from './CoinsSearch';

const CoinsScreen = (props) => {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const coins = await Http.get('https://api.coinlore.net/api/tickers/');

        if (coins.error) {
          throw new Error(coins.message);
        }

        setCoins(coins.data.data);
        setFilteredCoins(coins.data.data);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const handlePress = (coin) => {
    props.navigation.navigate('CoinDetail', {coin});
  };

  const handleSearch = (query) => {
    const filtered = coins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });

    setFilteredCoins(filtered);
  };

  return (
    <View style={styles.container}>
      <CoinsSearch onChange={handleSearch} />
      {loading ? (
        <ActivityIndicator color="#fff" size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredCoins}
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
    flex: 1,
    backgroundColor: Colors.charade,
  },
  button: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 5,
    margin: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  loader: {
    marginTop: '50%',
  },
});

export default CoinsScreen;
