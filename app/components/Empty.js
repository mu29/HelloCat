import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class Empty extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <Icon name="refresh" size={ 96 } color="#5B93FC" />
        <Text style={ { color: '#5B93FC' } }>Loading..</Text>
      </View>
    )
  }
}