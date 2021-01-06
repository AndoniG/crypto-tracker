import React, {useEffect, useState} from 'react';
import {
  Image,
  SectionList,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import http from '../../libs/http';
import colors from '../../res/colors';
import Colors from '../../res/colors';
import CoinMarketItem from './CoinMarketItem';
import storage from '../../libs/storage';

const CoinDetailScreen = (props) => {
  const [coin, setCoin] = useState({});
  const [markets, setMarkets] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const {coin} = props.route.params;
    setCoin(coin);
    props.navigation.setOptions({title: coin.symbol});
    getMarkets(coin.id);
    getFavorite(coin.id);
  }, []);

  const getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await http.get(url);

    if (markets.error) {
      return console.log(markets.message);
    }

    setMarkets(markets.data);
  };

  const toggleFavorite = async (coinId) => {
    if (isFavorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };

  const addFavorite = async () => {
    const coinToSave = JSON.stringify(coin);
    const key = `favorite-${coin.id}`;

    const stored = await storage.store(key, coinToSave);

    if (stored.error) {
      console.log(stored.message);
    } else {
      setIsFavorite(true);
    }
  };

  const removeFavorite = () => {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${coin.id}`;
          const removed = await storage.remove(key);
          if (!removed.error) {
            setIsFavorite(false);
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const getFavorite = async (coinId) => {
    try {
      const key = `favorite-${coinId}`;
      const favStr = await storage.get(key);

      if (favStr.data !== null) {
        setIsFavorite(true);
      }
    } catch (e) {
      console.log('get favorite err', e);
    }
  };

  const getSections = () => {
    const sections = [
      {
        title: 'Price',
        data: [`$ ${coin.price_usd}`],
      },
      {
        title: 'Market Cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
    ];
    return sections;
  };

  const getSymbolImage = () =>
    `https://c1.coinlore.com/img/25x25/${coin.nameid}.png`;

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.row}>
          <Image style={styles.iconImg} source={{uri: getSymbolImage()}} />
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>
        <Pressable
          onPress={toggleFavorite}
          style={[
            styles.btnFavorite,
            isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
          ]}>
          <Text style={styles.btnFavoriteText}>
            {isFavorite ? 'Remove favorite' : 'Add favorite'}
          </Text>
        </Pressable>
      </View>
      <SectionList
        style={styles.section}
        sections={getSections()}
        keyExtractor={(item) => item}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
        renderItem={({item}) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
      />

      <Text style={styles.marketTitle}>Markets</Text>
      <FlatList
        keyExtractor={(item) => `${item.base}-${item.name}-${item.quote}`}
        style={styles.list}
        horizontal={true}
        data={markets}
        renderItem={({item}) => <CoinMarketItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  row: {
    flexDirection: 'row',
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    color: colors.white,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  section: {
    maxHeight: 220,
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    fontSize: 14,
    color: colors.white,
  },
  sectionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
  },
  marketTitle: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
    fontWeight: 'bold',
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteText: {
    color: Colors.white,
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine,
  },
});

export default CoinDetailScreen;
