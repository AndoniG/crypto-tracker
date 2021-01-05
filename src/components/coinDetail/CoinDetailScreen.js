import React, {useEffect, useState} from 'react';
import {
  Image,
  SectionList,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import http from '../../libs/http';
import Colors from '../../res/colors';
import CoinMarketItem from './CoinMarketItem';

const CoinDetailScreen = (props) => {
  const [coin, setCoin] = useState({});
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    const {coin} = props.route.params;
    setCoin(coin);
    props.navigation.setOptions({title: coin.symbol});
    getMarkets(coin.id);
  }, []);

  const getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await http.get(url);

    if (markets.error) {
      return console.log(markets.message);
    }

    setMarkets(markets.data);
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
        <Image style={styles.iconImg} source={{uri: getSymbolImage()}} />
        <Text style={styles.titleText}>{coin.name}</Text>
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
  subHeader: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 16,
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#fff',
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
    color: '#fff',
  },
  sectionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  marketTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
    fontWeight: 'bold',
  },
});

export default CoinDetailScreen;
