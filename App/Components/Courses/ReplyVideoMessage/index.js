import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import {string} from 'App/i18n';
import {useSelector} from 'react-redux';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import {navigate} from 'App/Services/NavigationService';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {STUDENT_STACK, PLAYER_SCREEN} = Strings.Routes;

const ReplyVideoMessage = ({
  data,
  messageData,
  titleCource,
  courceIndex,
  isFree,
}) => {
  const videoData = useSelector((state) => state.appData?.EpisodeData);

  console.log('messageData', messageData);
  const renderItem = ({item, index}) => (
    <View style={styles.viewMain}>
      <View style={styles.viewTop}>
        <TouchableOpacity
          activeOpacity={ACTIVE_OPACITY}
          onPress={() => {
            const urlVideo = data?.[0]?.url;
            navigate(STUDENT_STACK, {
              screen: PLAYER_SCREEN,
              params: {urlVideo},
            });
          }}>
          <FontIcon
            name={Strings.Icons.PLAY}
            size={normal * 5}
            color={Colors.lightBlue}
          />
        </TouchableOpacity>
        <View style={styles.viewTexts}>
          <Text style={styles.textTitle} numberOfLines={1}>
            {titleCource}
          </Text>
          <Text style={styles.textEpisode}>
            {string.EPISODE} {courceIndex}
          </Text>
        </View>
        <View style={styles.viewType}>
          <Text style={styles.textType}>
            {data?.[0]?.isFree ? 'Free' : 'Activated'}
          </Text>
        </View>
      </View>
      <View style={styles.viewReplyMessage}>
        <Text style={styles.textMessage}>
          {messageData?.message || messageData}
        </Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.FlatList}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.title}${index}`}
    />
  );
};

export default ReplyVideoMessage;
