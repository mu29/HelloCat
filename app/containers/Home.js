import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, View, StyleSheet } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import DataBase from '../firebase/DataBase';
import Navigation from '../components/Navigation';
import Card from '../components/Card';
import IconButton from '../components/IconButton';
import { readVideoList, starVideo, unStarVideo } from '../modules/Video';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    flex: 1,
  },
  content: {
    height: 72,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

class Home extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
    };
  }

  componentDidMount() {
    this.props.readVideoList();
  }

  componentWillReceiveProps({ videos }) {
    if (videos !== undefined) {
      this.setState({ cards: videos });
    }
  }

  render() {
    const { cards } = this.state;
    const { stars, starVideo, unStarVideo } = this.props;
console.log(this);
    return (
      <View style={ styles.container }>
        <Navigation />
        <View style={ styles.card }>
          <SwipeCards
            cards={this.state.cards}
            loop={false}
            renderCard={(cardData) => <Card {...cardData} />}
            showYup={false}
            showNope={false}
          />
        </View>
        <View style={ styles.content }>
          <IconButton
            icon="star"
            size={ 36 }
            color="#5B93FC"
            enable={ cards[0] && stars.indexOf(cards[0].id) > -1 }
            onClick={ () => { cards[0] && (stars.indexOf(cards[0].id) > -1 ? unStarVideo(cards[0].id) : starVideo(cards[0].id)) } }
          />
          <IconButton icon="arrow-right" size={ 36 } color="#FA5D63" iconStyle={ { marginLeft: 2, marginBottom: 2 } } enable/>
        </View>
      </View>
    )
  }
}

export default connect(
  ({ Video }) =>({
    videos: Video.videos,
    stars: Video.stars
  }),
  { readVideoList, starVideo, unStarVideo }
)(Home);
