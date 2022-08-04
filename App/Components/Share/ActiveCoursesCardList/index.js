import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Platform} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import FastImage from 'react-native-fast-image';
import {normal} from 'App/Theme/Metrics';
import {Colors} from 'App/Theme';
import fetchColors from '../../../Services/getImageColor';
import {useDispatch} from 'react-redux';
import AppDataActions from 'App/Stores/AppData/Actions';
import {string} from 'App/i18n';
import {fontIconHandler} from 'App/utils/layoutIconHandler';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import {getLightnessOfRGB} from '../../../utils/getLightnessOfRGB';
import {hexAToRGBA} from '../../../utils/hexAToRGBA';

const {PLACEHOLDER} = Strings.ImageAddress;
const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const ActiveCoursesCardList = ({data}) => {
  const dispatch = useDispatch();
  console.log({data});

  const temp = data?.list?.phycisc?.array;

  const onItemPressed = (item) => {
    console.log({item});
    const courseId = item?._id;
    // dispatch(AppDataActions.homeScreenType(false));

    dispatch(AppDataActions.courseActivation({courseId}));
    // courseActivation
    // navigate(STUDENT_STACK, {screen: COURSE_ACTIVATION_SCREEN, params: item});
  };

  const Item = ({index, item}) => {
    const [color, setColor] = useState('');
    const [imageLoading, setImageLoading] = useState(true);
    const [textColor, setTextColor] = useState('');

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
        {imageLoading && (
          <FastImage
            source={PLACEHOLDER}
            style={[styles.mainBTN, {position: 'absolute'}]}
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

        <View
          style={[styles.cover, {backgroundColor: color || Colors.lightBlue}]}>
          <Text style={[styles.text, {color: textColor}]}>{item?.title}</Text>
          <View style={styles.viewicontext}>
            <Text style={[styles.text, {color: textColor}]}>
              {Platform.OS === 'android' ? item?.price : string.GET_COURSE}
            </Text>
            <FontIcon
              name={Strings.Icons.RIGHT_SMALL}
              color={textColor}
              size={normal * 1.6}
              style={fontIconHandler()}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderItem = ({item, index}) => <Item index={index} item={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.textheader}>{string.ACTIVE_COURSES}</Text>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.title}${index}`}
      />
    </View>
  );
};

export default ActiveCoursesCardList;
