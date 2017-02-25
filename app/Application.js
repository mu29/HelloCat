import React from 'react';
import { Provider } from 'react-redux';
import { AppState, Platform, View, Navigator, StyleSheet } from 'react-native';
import configureStore from './store/configureStore';
import Router from './Router';

export default class Application extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      store: configureStore(() => this.setState({ loading: false })),
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  render() {
    if (this.state.loading) {
      return null;
    }
    return(
      <Provider store={ this.state.store }>
        <Router />
      </Provider>
    );
  }
}
