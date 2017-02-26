import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, View, StyleSheet } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import Modal from 'react-native-modalbox';
import DataBase from '../firebase/DataBase';
import Navigation from '../components/Navigation';
import Card from '../components/Card';
import Empty from '../components/Empty';
import Report from '../components/Report';
import IconButton from '../components/IconButton';
import { readVideoList, reportVideo, viewVideo, clearViewData, starVideo, unStarVideo } from '../modules/Video';

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
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 320,
  },
});

class Home extends Component {
  constructor() {
    super();
    this.state = {
      currentCard: {},
    };
    this.nextCard = this.nextCard.bind(this);
    this.previousCard = this.previousCard.bind(this);
    this.setCurrentCard = this.setCurrentCard.bind(this);
  }

  componentDidMount() {
    this.props.readVideoList();
    if (this.props.videos !== undefined) {
      this.setState({ currentCard: this.props.videos[0] });
    }
  }

  componentWillReceiveProps({ videos }) {
    if (this.props.videos === undefined) {
      this.setState({ currentCard: videos[0] });
    }
  }

  nextCard() {
    this.refs.cardContainer._forceRightSwipe();
  }

  previousCard() {
    const { videos } = this.props;
    const nextIndex = videos.indexOf(this.state.currentCard) - 1;
    this.setState({ currentCard: videos[nextIndex] || videos[0] });
    this.refs.cardContainer._goToPrevCard();
  }

  setCurrentCard(index) {
    const { videos, viewVideo } = this.props;
    viewVideo(videos[index].id);
    this.setState({ currentCard: videos[index + 1] || videos[0] });
  }

  render() {
    const { currentCard } = this.state;
    const { views, stars, videos, reportVideo, clearViewData, starVideo, unStarVideo } = this.props;
    const currentId = currentCard && currentCard.id || 0;

    return (
      <View style={ styles.container }>
        <Navigation showModal={ () => this.refs.report.open() } />
        <View style={ styles.card }>
          <SwipeCards
            ref="cardContainer"
            cards={ videos }
            loop={ true }
            onLoop={ clearViewData }
            renderCard={ (cardData) => <Card {...cardData} next={ this.nextCard } /> }
            renderNoMoreCards={ () => <Empty /> }
            showYup={ false }
            showNope={ false }
            onClickHandler={ () => null }
            cardRemoved={ this.setCurrentCard }
          />
        </View>
        <View style={ styles.content }>
          <IconButton
            icon="arrow-left"
            size={ 24 }
            color="#797979"
            iconStyle={ { marginBottom: 2 } }
            enable
            onClick={ this.previousCard }
          />
          <IconButton
            icon="star"
            size={ 36 }
            color="#5B93FC"
            enable={ stars.indexOf(currentId) > -1 }
            onClick={ () => {
              if (Object.keys(this.state.currentCard).length === 0) {
                return;
              }
              stars.indexOf(currentId) > -1 ? unStarVideo(currentId) : starVideo(currentId)
            }}
          />
          <IconButton
            icon="arrow-right"
            size={ 24 }
            color="#797979"
            iconStyle={ { marginLeft: 2, marginBottom: 2 } }
            onClick={ () => this.refs.cardContainer._forceRightSwipe() }
            enable
          />
        </View>
        <Modal style={ styles.modal } position="center" ref="report">
          <Report reportVideo={ reportVideo } close={ () => this.refs.report.close() } />
        </Modal>
      </View>
    )
  }
}

export default connect(
  ({ Video }) =>({
    videos: Video.unWatchedVideos,
    views: Video.views,
    stars: Video.stars
  }),
  { readVideoList, reportVideo, viewVideo, clearViewData, starVideo, unStarVideo }
)(Home);
