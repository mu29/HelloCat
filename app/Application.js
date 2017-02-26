import React from 'react';
import { Provider } from 'react-redux';
import { AppState, Platform, View, Navigator, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import configureStore from './store/configureStore';
import Router from './Router';

firebase.initializeApp({
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  storageBucket: "<BUCKET>.appspot.com",
  messagingSenderId: "<SENDER_ID>",
});

export default class Application extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      store: configureStore(() => this.setState({ loading: false })),
    };
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
