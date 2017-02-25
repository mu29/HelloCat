import React, { Component } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import Navigation from '../components/Navigation';
import Card from '../components/Card';
import IconButton from '../components/IconButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    flex: 1,
  },
  content: {
    height: 72,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const Cards = [
  {name: '1', image: 'https://i.ytimg.com/vi/JwtP5m8fGzU/default.jpg'},
]

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      cards: Cards,
    };
  }

  render() {
    return (
      <View style={ styles.container }>
        <Navigation />
        <View style={ styles.card }>
          <SwipeCards
            cards={this.state.cards}
            loop={false}
            renderCard={(cardData) => <Card {...cardData} />}
            showYup={false}
            showNope={false}
          />
        </View>
        <View style={ styles.content }>
          <IconButton icon="star" size={ 36 } color="#5B93FC" />
          <IconButton icon="arrow-right" size={ 36 } color="#FA5D63" iconStyle={ { marginLeft: 2, marginBottom: 2 } } enable/>
        </View>
      </View>
    )
  }
}