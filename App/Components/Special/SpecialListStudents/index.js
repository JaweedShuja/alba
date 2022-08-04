import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Strings from 'App/Values/Strings';
import {Colors} from 'App/Theme';
import styles from './style';
import {navigate} from 'App/Services/NavigationService';
import {
  fontIconHandler,
  fontIconReverseHandler,
} from 'App/utils/layoutIconHandler';
import FontIcon from 'App/Components/CustomIcon/FontIcon';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const SpecialListStudents = ({data, stack = 'STUDENT_STACK'}) => {
  const onItemPressed = (item) => {
    navigate(stack, {screen: item.screen, params: item});
  };
  const Item = ({index, item}) => (
    <TouchableOpacity
      style={styles.mainBTN}
      activeOpacity={ACTIVE_OPACITY}
      onPress={onItemPressed.bind(null, item)}>
      <View style={styles.leftview}>
        <FastImage source={item?.image} style={styles.image} />
        <Text style={styles.text}>{item?.title}</Text>
      </View>
      <FontIcon
        name={Strings.Icons.RIGHT_SMALL}
        size={25}
        color={Colors.lightBlue}
        // style={{transform: [{rotateY: '0deg'}]}}

        style={fontIconHandler()}
      />
    </TouchableOpacity>
  );

  const renderItem = ({item, index}) => <Item index={index} item={item} />;
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

export default SpecialListStudents;
