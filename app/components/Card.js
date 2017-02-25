import React, { Component } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import YouTube from 'react-native-youtube'
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
    margin: 32,
    paddingTop: 8,
    borderRadius: 8,
    backgroundColor: '#000',
  },
  wrapper: {
    flex: 1,
    marginTop: 8,
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#000'
  },
  content: {
    width: 300,
    height: 48,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: '#FFF',
  },
  date: {
    color: '#BDBDBD',
  },
  count: {
    color: '#5B93FC',
    fontWeight: '500',
  },
});

export default class Card extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.wrapper }>
          <YouTube
            videoId="KVZ-P-ZI6W4" // The YouTube video ID
            play={ true }
            hidden={ false }
            playsInline={ true }    // control whether the video should play inline
            loop={ false }
            style={ styles.video }
          />
        </View>
        <View style={ styles.content }>
          <Text style={ styles.date }>2017. 2. 25 #2</Text>
          <View style={ { flex: 1 } } />
          <Icon name="star" size={ 16 } color="#5B93FC" />
          <Text style={ styles.count }> 3358</Text>
        </View>
      </View>
    )
  }
}
