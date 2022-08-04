import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import FastImage from 'react-native-fast-image';
import Strings from 'App/Values/Strings';

const {PLACEHOLDER} = Strings.ImageAddress;

const TeacherInfoCard = ({data}) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.viewBody}>
        <View style={[styles.image, {marginStart: 0}]}>
          {imageLoading && (
            <FastImage
              source={PLACEHOLDER}
              style={[
                styles.image,
                {
                  position: 'absolute',
                },
              ]}
              resizeMode={'cover'}
            />
          )}
          <FastImage
            source={{
              uri: data?.image?.path,
            }}
            onLoadEnd={() => setImageLoading(false)}
            style={styles.image}
            resizeMode={'cover'}
          />
        </View>

        <View style={styles.viewTexts}>
          <Text style={styles.textName} numberOfLines={1}>
            {data?.firstName}
          </Text>
          <Text style={styles.textLesson} numberOfLines={1}>
            {data?.teacherBranchs.join(' , ')}
          </Text>
          <Text style={styles.textDesc} numberOfLines={5}>
            {data?.bio}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TeacherInfoCard;
