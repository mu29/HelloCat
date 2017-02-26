import React, { Component } from 'react';
import { View, TextInput, Text, Button, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  input: {
    padding: 8,
    fontSize: 12,
    width: 320,
    height: 32,
    backgroundColor: '#F5F5F5',
  },
  title: {
    color: '#797979',
    padding: 8,
  },
  button: {
    width: 320,
    height: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5B93FC',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FAFAFA',
  },
});

export default class Report extends Component {
  constructor() {
    super();
    this.state = { url: '' };
  }

  render() {
    const { url } = this.state;
    const { reportVideo, close } = this.props;

    return (
      <View style={ styles.container }>
        <Text style={ styles.title }>Youtube video link</Text>
        <View style={ { flex: 1 } } />
        <TextInput
          style={ styles.input }
          placeholder="ex) https://www.youtube.com/watch?v=9bZkp7q19f0"
          autoCorrect={false}
          underlineColorAndroid="rgba(0,0,0,0)"
          onChangeText={ (text) => this.setState({ url: text }) }
        />
        <TouchableHighlight
          underlayColor={ 'transparent' }
          onPress={
            () => {
              reportVideo(url);
              close();
            }
          }
        >
          <View style={ styles.button }>
            <Icon name="envelope" size={ 14 } color="#FFF" />
            <Text style={ styles.text }> Submit</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}