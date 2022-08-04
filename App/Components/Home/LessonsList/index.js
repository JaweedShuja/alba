import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import FastImage from 'react-native-fast-image';
import {normal} from 'App/Theme/Metrics';
import {Colors} from 'App/Theme';
import {navigate} from 'App/Services/NavigationService';
import fetchColors from '../../../Services/getImageColor';
import {fontIconHandler} from 'App/utils/layoutIconHandler';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import {getLightnessOfRGB} from '../../../utils/getLightnessOfRGB';
import {hexAToRGBA} from '../../../utils/hexAToRGBA';

const {PLACEHOLDER} = Strings.ImageAddress;
const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {STUDENT_STACK, COURSES_INFO_SCREEN} = Strings.Routes;

const LessonsList = ({data}) => {
  console.log({data});

  const temp = data?.list?.phycisc?.array;

  const onItemPressed = (item) => {
    console.log({item});
    // dispatch(AppDataActions.homeScreenType(false));

    // dispatch(AppDataActions.courseActivation({courseId}));
    // courseActivation
    navigate(STUDENT_STACK, {
      screen: COURSES_INFO_SCREEN,
      params: {teacherId: item?._id},
    });
  };

  const Item = ({index, item}) => {
    const [color, setColor] = useState('');
    const [textColor, setTextColor] = useState('');

    const [imageLoading, setImageLoading] = useState(true);

    fetchColors(item?.image?.path).then((res) => {
      if (res != '') {
        setColor(res);
        let RGBAcolor = hexAToRGBA(res, 1);
        // let backColor = getLightnessOfRGB(RGBAcolor);
        let thisColor = getLightnessOfRGB(RGBAcolor);
        console.log({thisColor});

        if (thisColor !== 'light') {
          setTextColor(Colors.white);
        } else {
          setTextColor(Colors.text);
        }
      } else setColor(Colors.lightBlue);
    });
    return (
      <TouchableOpacity
        style={styles.mainBTN}
        activeOpacity={ACTIVE_OPACITY}
        onPress={onItemPressed.bind(null, item)}>
        <>
          {imageLoading && (
            <FastImage
              source={PLACEHOLDER}
              style={[styles.image, {position: 'absolute'}]}
              resizeMode={'cover'}
            />
          )}
          <FastImage
            source={{
              uri: item?.image?.path,
            }}
            onLoadEnd={() => setImageLoading(false)}
            style={styles.image}
            resizeMode={'cover'}
          />
        </>

        <View
          style={[styles.cover, {backgroundColor: color || Colors.lightBlue}]}>
          <Text style={[styles.text, {color: textColor}]}>
            {item?.firstName}
          </Text>
          <View style={styles.viewicontext}>
            <FontIcon
              name={Strings.Icons.RIGHT_SMALL}
              size={normal * 1.6}
              style={fontIconHandler()}
              color={textColor}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderItem = ({item, index}) => <Item index={index} item={item} />;

  return (
    <FlatList
      data={data}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={styles.flatList}
      contentContainerStyle={styles.flatListContent}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.title}${index}`}
    />
  );
};
export default LessonsList;
