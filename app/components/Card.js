import React, { Component } from 'react';
import { Platform, Text, Image, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AdMobBanner } from 'react-native-admob';
import VideoPlayer from './VideoPlayer';
import { commaNumber } from '../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 350,
    marginTop: 16,
    marginBottom: 24,
    paddingTop: 8,
    borderRadius: 8,
    backgroundColor: '#000',
  },
  wrapper: {
    flex: 1,
    marginTop: 8,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#000',
  },
  content: {
    width: 350,
    height: 48,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: '#FFF',
  },
  view: {
    color: '#BDBDBD',
  },
  star: {
    color: '#5B93FC',
    fontWeight: '500',
  },
  admobWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  admob: {
    width: 300,
    height: 250,
    backgroundColor: '#000',
  },
});

export default class Card extends Component {
  constructor() {
    super();
    this.renderAd = this.renderAd.bind(this);
    this.renderCard = this.renderCard.bind(this);
  }

  renderAd() {
    return (
      <View style={ [styles.container, styles.admobWrapper] }>
        <AdMobBanner
          style={ styles.admob }
          bannerSize="mediumRectangle"
          adUnitID={ Platform.OS === 'android' ? 'ca-app-pub-6988311040138762/1354777738' : 'ca-app-pub-6988311040138762/5483926136' }
        />
      </View>
    )
  }

  renderCard() {
    const { url, view, star, next } = this.props;
    return (
      <View style={ styles.container }>
        <View style={ styles.wrapper }>
          <VideoPlayer videoId={ url } style={ styles.video } onEnd={ next } />
        </View>
        <View style={ styles.content }>
          <Icon name="eye" size={ 16 } color="#BDBDBD" />
          <Text style={ styles.view }> { commaNumber(view) }</Text>
          <View style={ { flex: 1 } } />
          <Icon name="star" size={ 16 } color="#5B93FC" />
          <Text style={ styles.star }> { commaNumber(star) }</Text>
        </View>
      </View>
    )
  }

  render() {
    const { ad } = this.props;
    return ad ? this.renderAd() : this.renderCard()
  }
}
