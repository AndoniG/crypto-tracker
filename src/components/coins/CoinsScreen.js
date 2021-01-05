import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Http from '../../libs/http';
import CoinsItem from './CoinsItem';

const CoinsScreen = (props) => {
  const [coins, setCoins] = useState([]);
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
        setLoading(false);
      } catch (e) {
        console.log(e.message);
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const handlePress = () => {
    console.log('Go to detail', props);
    props.navigation.navigate('CoinDetail');
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color="#fff" size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={coins}
          renderItem={({item}) => <CoinsItem item={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
