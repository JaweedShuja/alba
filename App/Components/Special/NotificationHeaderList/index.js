import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import FastImage from 'react-native-fast-image';
import Images from '../../../Theme/Images';
import fetchColors from '../../../Services/getImageColor';
import {Colors} from 'App/Theme';
import {hexAToRGBA} from '../../../utils/hexAToRGBA';
import {getLightnessOfRGB} from '../../../utils/getLightnessOfRGB';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const uri =
  'https://allea.org/wp-content/uploads/2019/06/shutterstock_520698799small-1500x430.jpg';
const NotificationHeaderList = ({data = ['', '', '']}) => {
  const Item = ({index, item}) => {
    const [color, setColor] = useState(Colors.white);

    fetchColors(uri).then((res) => {
      let RGBAcolor = hexAToRGBA(res, 1);
      let thisColor = getLightnessOfRGB(RGBAcolor);
      if (!thisColor !== 'light') {
        setColor(Colors?.white);
      } else {
        setColor(Colors?.text);
      }
    });
    return (
      <TouchableOpacity style={styles.mainView} activeOpacity={ACTIVE_OPACITY}>
        <FastImage source={{uri}} style={styles.image} resizeMode="cover">
          <Text style={[styles.textList, {color}]}>Skuba</Text>
        </FastImage>
      </TouchableOpacity>
    );
  };
  const renderItem = ({item, index}) => <Item index={index} item={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity>
          <Text style={styles.title}>Popular</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        style={styles.flatList}
        contentContainerStyle={styles.FlatListContent}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.title}${index}`}
      />
    </View>
  );
};

export default NotificationHeaderList;
