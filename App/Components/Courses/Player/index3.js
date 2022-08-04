import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import {WebView} from 'react-native-webview';
import ReactPlayer from 'react-player';
import RenderHtml from 'react-native-render-html';

const htmlContent = `
    <h1>This HTML snippet is Using react-native-render-html !</h1>
    <h2>Trying many tag to render html</h2>
    <div>
    <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
    <div>`;

const Player = ({url}) => {
  console.log({url});
  const uri = url;
  let videoid = uri.match(
    /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/,
  );
  if (videoid != null) {
    console.log('video id = ', videoid[1]);
  } else {
    console.log('The youtube url is not valid.');
  }
  //   let videoPlayer: Video;
  return (
    <View style={styles.safeArea}>
      <RenderHtml
        source={htmlContent}
        html={htmlContent}
        imagesMaxWidth={Dimensions.get('window').width}
        enableExperimentalMarginCollapsing={true}
      />
    </View>
  );
};

export default Player;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

{
  // <WebView
  // style={{flex: 1}}
  // source={{
  //   uri:
  //     'https://www.youtube.com/embed/DGQwd1_dpuc?rel=0&autoplay=0&showinfo=0&controls=0',
  // }}
  // javaScriptEnabled={true}
  //   source={{uri: 'https://www.youtube.com/embed/' + 'ST4MfFHLPIA'}}
  //   ref={(ref: Video) => {
  //     videoPlayer = ref;
  //   }}
  // //   scalesPageToFit={true}
  // source={{
  //   html:
  //    ''    }}
  // source={{
  //   html:
  //     '<html><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" /><iframe src="https://www.youtube.com/embed/' +
  //     'ST4MfFHLPIA' +
  //     '?modestbranding=1&playsinline=1&showinfo=0&rel=0" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe></html>',
  // }}
  //   onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} //for iOS
  //   onNavigationStateChange={this.onShouldStartLoadWithRequest} //for Android
  // />
  // <WebView
  //   source={{uri: 'https://www.youtube.com/embed/' + videoid[1]}}
  //   startInLoadingState={true}
  //   mediaPlaybackRequiresUserAction={
  //     Platform.OS !== 'android' || Platform.Version >= 17
  //       ? false
  //       : undefined
  //   }
  // />
}
