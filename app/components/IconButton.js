import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: '#E0E0E0',
    borderWidth: 0.5,
  }
});

export default class IconButton extends Component {
  render() {
    const { enable, icon, size, color, ...props } = this.props;
    const circleStyle = {
      width: size + 16,
      height: size + 16,
      borderRadius: size / 2 + 8,
      marginLeft: size / 3,
      marginRight: size / 3,
    };
    const iconColor = enable ? color : '#E0E0E0';
    return (
      <View style={ [styles.container, circleStyle] } { ...props }>
        <Icon name={ icon } size={ size } color={ iconColor } />
      </View>
    )
  }
}
