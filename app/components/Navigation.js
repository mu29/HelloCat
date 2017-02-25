import React, { Component } from 'react';
import { Platform, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 48 + (Platform.OS === 'android' ? 0 : 20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 0.5,
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
      </View>
    );
  }
}