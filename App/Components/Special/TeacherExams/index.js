import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import moment from 'moment';
import {string} from 'App/i18n';
import FontIcon from 'App/Components/CustomIcon/FontIcon';

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
const TeacherExams = ({data}) => {
  const Item = ({index, item}) => (
    <View style={styles.mainView}>
      <View style={styles.viewTop}>
        <Text style={styles.title}>{item.grade}</Text>
        <View style={styles.viewTextIcon}>
          <FontIcon
            name={Strings.Icons.EMAIL_OUTLINE}
            color={Colors.lightBlue}
            size={normal * 1.8}
          />
          <Text style={styles.text}>{item.name}</Text>
        </View>
        <View style={styles.viewTextIcon}>
          <FontIcon
            name={Strings.Icons.CLOCK_CHECK}
            color={Colors.lightBlue}
            size={normal * 1.5}
          />
          <Text style={styles.text}>
            {string.STARTED} {item.start}
          </Text>
        </View>
        <View style={styles.viewTextIcon}>
          <FontIcon
            name={Strings.Icons.CLOCK_CHECK}
            color={Colors.lightBlue}
            size={normal * 1.5}
          />
          <Text style={styles.text}>
            {string.ENDED} {item.end}
          </Text>
        </View>
      </View>

      <View style={styles.viewType}>
        <Text style={styles.textType}>{item.type}</Text>
      </View>
    </View>
  );
  const renderItem = ({item, index}) => <Item index={index} item={item} />;

  const typeOfExam = toTitleCase(data?.type);
  const startHour = moment(data?.startDate).format('HH:mm');
  const endHour = moment(data?.endDate).format('HH:mm');
  const lessonName = data?.course?.lesson?.title;
  const dateExam = moment(data?.startDate).format('YYYY-MMMM-DD-dddd');
  const gradeTitle = data?.course?.grade?.title;
  const categoryTitle = data?.course?.grade?.category?.title;
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>{string.EXAMS}</Text>
      <View style={styles.mainView}>
        <View style={styles.viewTop}>
          <Text style={styles.title}>
            {gradeTitle} Of {categoryTitle}
          </Text>
          <View style={styles.viewTextIcon}>
            <FontIcon
              name={Strings.Icons.EMAIL_OUTLINE}
              color={Colors.lightBlue}
              size={normal * 1.8}
            />
            <Text style={styles.text}>
              {lessonName} {string.EXAM}
            </Text>
          </View>
          <View style={styles.viewTextIcon}>
            <FontIcon
              name={Strings.Icons.CLOCK_CHECK}
              color={Colors.lightBlue}
              size={normal * 1.5}
            />
            <Text style={styles.text}>
              {string.STARTED} {startHour}
            </Text>
          </View>
          <View style={styles.viewTextIcon}>
            <FontIcon
              name={Strings.Icons.CLOCK_CHECK}
              color={Colors.lightBlue}
              size={normal * 1.5}
            />
            <Text style={styles.text}>
              {string.ENDED} {endHour}
            </Text>
          </View>
          <View style={styles.viewTextIcon}>
            <FontIcon
              name={Strings.Icons.CALENDAR}
              color={Colors.lightBlue}
              size={normal * 1.5}
            />
            <Text style={styles.text}>
              {string.EXAM_DATE} {dateExam}
            </Text>
          </View>
        </View>

        <View style={styles.viewType}>
          <Text style={styles.textType}>{typeOfExam}</Text>
        </View>
      </View>
      {/* <FlatList
=======
      <Text style={styles.textTitle}>{string.EXAMS}</Text>
      <FlatList
>>>>>>> 39c11b6a5cae6bc33774c36118b2bfbb076cd26b
        data={data}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.FlatList}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.title}${index}`}
      /> */}
    </View>
  );
};

export default TeacherExams;
