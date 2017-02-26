import React, { Component } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import YouTube from 'react-native-youtube'
import Icon from 'react-native-vector-icons/FontAwesome';
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
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#000'
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
});

export default class Card extends Component {
  render() {
    const { url, view, star, next } = this.props;
    return (
      <View style={ styles.container }>
        <View style={ styles.wrapper }>
          <YouTube
            videoId={ url }
            play={ true }
            hidden={ false }
            playsInline={ true }
            loop={ false }
            style={ styles.video }
            showInfo={ false }
            rel={ false }
            modestbranding={ true }
            apiKey="AIzaSyCm10wCjq4co9FD-TPgWHv6pFHSoQnmAcg"
            onChangeState={ e => e.state === 'ended' && next() }
          />
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
}
