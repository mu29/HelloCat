import React, { Component } from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: '#E0E0E0',
    borderWidth: 0.5,
  }
});

export default class IconButton extends Component {
  render() {
    const { enable, icon, iconStyle, size, color, onClick, ...props } = this.props;
    const circleStyle = {
      width: size + 16,
      height: size + 16,
      borderRadius: (size + 16) / 2,
      marginLeft: size / 3,
      marginRight: size / 3,
    };
    const iconColor = enable ? color : '#E0E0E0';
    return (
      <TouchableHighlight underlayColor={ 'transparent' } onPress={ onClick }>
        <View style={ [styles.container, circleStyle] } { ...props }>
          <Icon style={ iconStyle } name={ icon } size={ size } color={ iconColor } />
        </View>
      </TouchableHighlight>
    )
  }
}
