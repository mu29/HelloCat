import React, { Component } from 'react';
import { Platform, TouchableHighlight, Image, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconButton from '../components/IconButton';

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
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButton: {
    marginLeft: 24,
  },
  rightButton: {
    marginRight: 24,
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
    const { showModal, refresh } = this.props;
    return (
      <View style={ styles.container }>
        <View style={ styles.buttonWrapper }>
          <TouchableHighlight underlayColor={ 'transparent' } onPress={ refresh }>
            <Icon style={ styles.leftButton } name="refresh" color="#E0E0E0" size={ 24 } />
          </TouchableHighlight>
          <View style={ { flex: 1 } } />
        </View>
        <Image source={ require('../resources/icon.png') } style={ { width: 24, height: 24 } } />
        <Text style={ styles.title }>HelloCat</Text>
        <View style={ styles.buttonWrapper }>
          <View style={ { flex: 1 } } />
          <TouchableHighlight underlayColor={ 'transparent' } onPress={ showModal }>
            <Icon style={ styles.rightButton } name="plus-circle" color="#E0E0E0" size={ 24 } />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}