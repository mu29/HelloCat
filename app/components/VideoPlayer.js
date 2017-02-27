import React from 'react';
import { Animated, View, StyleSheet, Platform, ActivityIndicator, Easing } from 'react-native';
import YouTube from 'react-native-youtube';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerAndroidFix: {
    marginBottom: 0.1
  }
});

export default class VideoPlayer extends React.Component {
  static propTypes = {
    videoId: React.PropTypes.string,
    style: React.PropTypes.any,
    onEnd: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(1),
      loading: true,
      androidForceRelayoutFix: false
    };
    this.onChangeState = this.onChangeState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.videoId !== nextProps.videoId) {
      this.state.opacity.setValue(0);
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.quad,
      }).start();
    }
  }

  render() {
    if (Platform.OS === 'android') {
      return this.renderAndroid();
    }
    return this.renderIOS();
  }

  renderIOS() {
    const { videoId, style } = this.props;
    const { loading, opacity } = this.state;
    return (
      <View style={ [styles.container, style] }>
        { loading ? <ActivityIndicator size='large' /> : undefined }
        <Animated.View style={ [StyleSheet.absoluteFill, { opacity: opacity }] }>
          <YouTube
            style={ StyleSheet.absoluteFill }
            apiKey="AIzaSyAxvXdsbg9677FMfCfL3-kx0z7mnM4NA9Y"
            videoId={ videoId }
            play={ true }
            rel={ false }
            modestbranding={ true }
            showinfo={ false }
            playsInline={ true }
            hidden={ false }
            loop={ false }
            onChangeState={ this.onChangeState }
          />
        </Animated.View>
      </View>
    );
  }

  renderAndroid() {
    const { videoId, style } = this.props;
    const { androidForceRelayoutFix } = this.state;
    return (
      <View style={ [styles.container, style] }>
        <YouTube
          style={ {
            position: 'absolute',
            left: 0,
            top: 0,
            right: androidForceRelayoutFix ? 0 : 1,
            bottom: 0,
          } }
          apiKey="AIzaSyAxvXdsbg9677FMfCfL3-kx0z7mnM4NA9Y"
          videoId={ videoId}
          play={ true }
          rel={ false }
          modestbranding={ true }
          showinfo={ false }
          playsInline={ true }
          hidden={ false }
          loop={ false }
          onChangeState={ this.onChangeState }
        />
      </View>
    );
  }

  onChangeState({ state }) {
    if (state === 'ended') {
      this.props.onEnd && this.props.onEnd();
    } else if (state === 'loaded') {
      this.setState({ androidForceRelayoutFix: true });
    } else if (state === 'started') {
      this.setState({ androidForceRelayoutFix: true });
    } else if (state === 'windowMode') {
      this.setState({ androidForceRelayoutFix: !this.state.androidForceRelayoutFix });
    }
  }
}