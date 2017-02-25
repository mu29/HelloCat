import React, { Component } from 'react';
import { BackAndroid, Platform, Navigator, StyleSheet } from 'react-native';
import Home from './containers/Home';

const ROUTES = { home: Home };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export deufalt class Router extends Component {
  constructor() {
    super();
    this._handlers = [];
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    for (let i = this._handlers.length - 1; i >= 0; i--) {
      if (this._handlers[i]()) {
        return true;
      }
    }

    const { navigator } = this.refs;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }

    return false;
  }

  render() {
    return(
      <Navigator
        ref="navigator"
        style={ styles.container }
        configureScene={
          (route) => {
            if (Platform.OS === 'android') {
              return Navigator.SceneConfigs.FloatFromBottomAndroid;
            } else {
              return Navigator.SceneConfigs.FloatFromRight;
            }
          }
        }
        initialRoute={ { name: 'home' } }
        renderScene={ this.renderScene }
      />
    );
  }

  renderScene(route, navigator) {
    let Component = ROUTES[route.name];
    return <Component { ...route.passProps } route={ route } navigator={ navigator } />;
  }
}
