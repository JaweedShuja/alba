import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  I18nManager,
} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import FastImage from 'react-native-fast-image';
import {normal} from 'App/Theme/Metrics';
import {Colors} from 'App/Theme';
import {navigate} from 'App/Services/NavigationService';
import Modal from 'react-native-modal';
import fetchColors from '../../../Services/getImageColor';
import AppDataActions from 'App/Stores/AppData/Actions';
import TeacherDataActions from 'App/Stores/TeacherData/Actions';
import {useDispatch} from 'react-redux';
import {fontIconHandler} from 'App/utils/layoutIconHandler';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import ExamIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {string} from 'App/i18n';
const {height} = Dimensions.get('screen');
const {PLACEHOLDER} = Strings.ImageAddress;

let screen;
if (height > 645) screen = true;
else screen = false;
const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {
  COURSES_VIDEOS_SCREEN,
  STUDENT_STACK,
  TEACHER_STACK,
  TEACHER_LESSON_NOTES_SCREEN,
  TEACHER_ADD_EXAM_SCREEN,
  TEACHER_ADD_EXAM_CLASSIC_SCREEN,
} = Strings.Routes;

const HorizontalListCourses = ({data, type = '', title}) => {
  const dispatch = useDispatch();

  console.log({data});
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  //const temp = data?.list?.phycisc?.array;
  const onPressedCloseModal = () => {
    setModalVisible(false);
  };
  const onItemPressed = (item) => {
    if (type === 'note') {
      navigate(TEACHER_STACK, {
        screen: TEACHER_LESSON_NOTES_SCREEN,
        params: {ID: item._id},
      });
    } else if (type === 'exam') {
      setModalVisible(true);
      setCurrentItem(item);
    } else if (type === 'course') {
      const courseId = item?._id;
      dispatch(AppDataActions.courseActivation({courseId}));
      navigate(STUDENT_STACK, {screen: COURSES_VIDEOS_SCREEN, params: item});
    } else {
      const courseId = item?._id;
      console.log('+++', courseId);
      dispatch(TeacherDataActions.getTeacherCourse(courseId));
      // const courseId = item?._id;
      // dispatch(AppDataActions.courseActivation({courseId}));
    }
    // dispatch(AppDataActions.courseActivation({courseId}));

    // navigate(STUDENT_STACK, {screen: COURSES_VIDEOS_SCREEN, params: item});
  };

  const onCloseModal = () => {
    setModalVisible(false);
  };

  const onPressedAddExam = (examType) => {
    console.log({examType});
    setModalVisible(false);
    if (examType === 'TEST') {
      navigate(TEACHER_STACK, {
        screen: TEACHER_ADD_EXAM_SCREEN,
        params: {currentItem, examType},
      });
    } else {
      navigate(TEACHER_STACK, {
        screen: TEACHER_ADD_EXAM_CLASSIC_SCREEN,
        params: {currentItem, examType},
      });
    }
  };

  const Item = ({index, item}) => {
    const [color, setcolor] = useState('');
    const [imageLoading, setImageLoading] = useState(true);

    fetchColors(item?.image?.path).then((res) => {
      res !== '' ? setcolor(res) : setcolor(Colors.lightBlue);
      // if (res != '') setcolor(res);
      // else color = Colors.lightBlue;
    });
    console.log({imageLoading});
    return (
      <TouchableOpacity
        style={styles.mainBTN}
        activeOpacity={ACTIVE_OPACITY}
        onPress={onItemPressed.bind(null, item)}>
        <View style={styles.image}>
          {imageLoading && (
            <FastImage
              source={PLACEHOLDER}
              style={[styles.image, {position: 'absolute', zIndex: 1000}]}
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
        </View>

        <View style={styles.viewParticipants}>
          <Text
            style={[
              styles.text,
              {
                color: Colors.lightBlue,
                // || Colors.lightBlue
              },
            ]}>
            {string.PARTICIPANTS} {item?.students?.length}
          </Text>
        </View>
        <View
          style={[
            styles.cover,
            {
              backgroundColor: color || Colors.lightBlue,
            },
          ]}>
          <Text style={[styles.text]}>{item?.title}</Text>
          <View style={styles.viewicontext}>
            {type === 'note' ? (
              <Text style={styles.text}>{string.ADD_NOTE}</Text>
            ) : type === 'exam' ? (
              <View style={styles.viewExam}>
                <Text style={[styles.text, {color: Colors.lightBlue}]}>
                  {string.ADD_EXAM}{' '}
                </Text>
              </View>
            ) : (
              <Text style={styles.text}>{string.SEE_COURSE}</Text>
            )}
            {type === 'exam' ? null : (
              <FontIcon
                name={Strings.Icons.RIGHT_SMALL}
                size={normal * 1.3}
                style={fontIconHandler()}
                color={Colors.white}
              />
            )}
          </View>
        </View>
        {type === 'note' ? (
          <View style={styles.viewPlus}>
            <FontIcon
              name={Strings.Icons.PLUS}
              size={screen ? normal * 2.8 : normal * 2.3}
              style={styles.Icon}
              color={Colors.white}
            />
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  const renderItem = ({item, index}) => <Item index={index} item={item} />;

  const ModalAddExam = () => (
    <Modal
      isVisible={modalVisible}
      backdropColor="rgba(0,0,0,0.5)"
      onBackdropPress={onCloseModal}>
      <View style={styles.viewMainModal}>
        <View style={styles.viewExit}>
          <Text style={styles.textTitleModal}>
            {string.WHAT_KIND_OF_EXAM_WANT_TO_ADD}
          </Text>
          <TouchableOpacity
            onPress={onPressedCloseModal}
            activeOpacity={ACTIVE_OPACITY}>
            <FontIcon
              name={Strings.Icons.CANCEL}
              color={Colors.textColorLess}
              size={25}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.borderView} />
        <TouchableOpacity
          onPress={onPressedAddExam.bind(null, 'CLASSIC')}
          style={styles.modalBtn}
          activeOpacity={ACTIVE_OPACITY}>
          <ExamIcon
            name="text-box-check-outline"
            color={Colors.white}
            size={normal * 2}
          />
          <Text style={styles.textModalBtn}>{string.ADD_CLASSIC_EXAM}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressedAddExam.bind(null, 'TEST')}
          style={styles.modalBtn}
          activeOpacity={ACTIVE_OPACITY}>
          <FontIcon
            name={Strings.Icons.TEST_EXAM}
            color={Colors.white}
            size={normal * 2}
          />
          <Text style={styles.textModalBtn}>{string.ADD_TEST_EXAM}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.textheader}>{title}</Text>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        inverted={data?.length > 1 ? false : I18nManager.isRTL ? true : false}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.title}${index}`}
      />
      {/* {ModalAddExam()} */}
      <ModalAddExam />
    </View>
  );
};

export default HorizontalListCourses;
