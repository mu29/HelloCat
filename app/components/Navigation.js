import React, { Component } from 'react';
import { Platform, Image, Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 48 + (Platform.OS === 'android' ? 0 : 20),
    paddingTop: Platform.OS === 'android' ? 0 : 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
  },
  title: {
    marginLeft: 8,
    color: "#5B93FC",
    fontSize: 18,
    fontWeight: '500',
  },
});

export default class Navigation extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={ styles.container }>
        <Image source={ require('../resources/icon.png') } style={ { width: 24, height: 24 } } />
        <Text style={ styles.title }>DailyCat</Text>
      </View>
    );
  }
}