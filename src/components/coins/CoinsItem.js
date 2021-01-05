import React from 'react';
import {Text, View, StyleSheet, Image, Platform, Pressable} from 'react-native';
import ArrowUp from '../../assets/arrow_up.png';
import ArrowDown from '../../assets/arrow_down.png';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const CoinsItem = ({item, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText} adjustsFontSizeToFit>
          {item.symbol}
        </Text>
        <Text style={styles.nameText} adjustsFontSizeToFit>
          {item.name}
        </Text>
        <Text
          style={styles.priceText}
          adjustsFontSizeToFit>{`$${item.price_usd}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.percentText} adjustsFontSizeToFit>
          {' '}
          {item.percent_change_1h}
        </Text>
        <Image
          style={styles.imgIcon}
          source={item.percent_change_1h > 0 ? ArrowUp : ArrowDown}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: Colors.zircon,
    borderWidth: 1,
    paddingLeft: Platform.OS === 'ios' ? 16 : 5,
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 12,
  },
  nameText: {
    color: '#fff',
    fontSize: 12,
    marginRight: 16,
  },
  priceText: {
    color: '#fff',
    fontSize: 12,
  },
  percentText: {
    color: '#fff',
    fontSize: 10,
    marginRight: 8,
  },
  imgIcon: {
    width: 22,
    height: 22,
  },
});

export default CoinsItem;
