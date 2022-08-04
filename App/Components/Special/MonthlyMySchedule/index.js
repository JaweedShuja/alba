import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './style';
import {normal} from 'App/Theme/Metrics';
import {Colors} from 'App/Theme';
import Loading from '../../../Components/Share/Loading';
import {string} from 'App/i18n';

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
import moment from 'moment';
import {I18nManager} from 'react-native';

const MonthlyMySchedule = ({loadingSchedule, userSchedules}) => {
  const result = userSchedules?.result;
  const course = userSchedules?.course;
  const teacherName = course?.teacher?.firstName;
  const lessonName = course?.lesson?.title;
  const title = course?.title;
  console.log({userSchedules});

  if (I18nManager.isRTL) {
    moment.locale('ar', {
      months: [
        string.JANUARY,
        string.FEBRUARY,
        string.MARCH,
        string.APRIL,
        string.MAY,
        string.JUNE,
        string.JULY,
        string.AUGUST,
        string.SEPTEMBER,
        string.OCTOBER,
        string.NOVEMBER,
        string.DECEMBER,
      ],
      weekdays: [
        string.SUNDAY,
        string.MONDAY,
        string.TUESDAY,
        string.WEDNESDAY,
        string.THURSDAY,
        string.FRIDAY,
        string.SATURDAY,
      ],
    });
  } else {
    moment.locale('en');
  }

  var getDaysArray = function (year, month) {
    var monthIndex = month - 1; // 0..11 instead of 1..12
    var names = [
      string.SUNDAY,
      string.MONDAY,
      string.TUESDAY,
      string.WEDNESDAY,
      string.THURSDAY,
      string.FRIDAY,
      string.SATURDAY,
    ];
    var date = new Date(year, monthIndex, 1);
    var result = [];
    while (date.getMonth() == monthIndex) {
      // console.log(names[date.getDay()]);
      result.push({
        day: date.getDate(),
        dayOfWeek: names[date.getDay()],
      });

      // result.push(date.getDate() + `${'\n'}` + names[date.getDay()]);
      date.setDate(date.getDate() + 1);
    }
    return result;
  };

  let allMonths = moment.months();
  let currentMonthNum = moment().month();
  let currentYear = moment().year();
  let currentMonth = allMonths[currentMonthNum];
  let daysCurrentMonth = moment().daysInMonth();
  let arrayDaysOfCurrentMonth = getDaysArray(currentYear, currentMonthNum + 1);

  const Item = ({index, item}) => {
    const res = moment(item?.day).format('DD-MMMM-dddd');
    const day = res?.split('-');
    const episode = item?.episode;
    const exam = item?.exam;
    const timeEpisode = moment(item?.episode?.startDate).format('hh:mm');
    const timeExam = moment(item?.exam?.startDate).format('hh:mm');
    console.log('itemmmmmmmmmm', {day});

    return (
      <View
        style={[
          styles.mainBTN,
          // {backgroundColor: index == 0 ? Colors.lightBlue : Colors.white},
        ]}>
        <View style={styles.viewDays}>
          <Text style={styles.textDay}>{day[0]}</Text>
          <Text style={styles.textMonth}>
            {day[1]}
            {`${'\n'}`}
            {day[2]}
          </Text>
        </View>
        <View style={styles.viewLesson}>
          {episode && (
            <View style={styles.episodeView}>
              <View
                style={[
                  styles.boxEpisodeTop,
                  {justifyContent: 'space-between'},
                ]}>
                <Text style={styles.textBoxEpisodeTime}>{timeEpisode}</Text>
                <Text style={styles.textBoxEpisode}>{title}</Text>
              </View>
              <View style={styles.borderView} />

              <View style={styles.boxEpisodeBottom}>
                <Text style={styles.lorem} numberOfLines={2}>
                  {episode?.text}
                </Text>
                <View
                  style={[
                    styles.boxEpisodeTop,
                    {
                      marginBottom: normal * 0.5,
                    },
                  ]}>
                  <Text style={styles.textBoxEpisode}>{teacherName},</Text>
                  <Text style={styles.textBoxEpisode}>{lessonName}</Text>
                </View>
              </View>
            </View>
          )}
        </View>
        <View style={styles.viewExam}>
          {exam && (
            <View
              style={[styles.episodeView, {backgroundColor: Colors.lightBlue}]}>
              <View
                style={[
                  styles.boxEpisodeTop,
                  {justifyContent: 'space-between'},
                ]}>
                <Text style={styles.textBoxEpisodeTime}>{timeExam}</Text>
                <Text style={styles.textBoxEpisode}>{title}</Text>
              </View>
              <View style={styles.borderView} />

              <View style={styles.boxEpisodeBottom}>
                <Text style={styles.lorem} numberOfLines={2}>
                  {exam?.text}
                </Text>
                <View
                  style={[
                    styles.boxEpisodeTop,
                    {
                      marginBottom: normal * 0.5,
                    },
                  ]}>
                  <Text style={styles.textBoxEpisode}>{teacherName},</Text>
                  <Text style={styles.textBoxEpisode}>{lessonName}</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderItem = ({item, index}) => <Item index={index} item={item} />;

  const FlatListHeader = () => {
    return (
      <View
        style={[
          styles.mainView,
          // {backgroundColor: index == 0 ? Colors.lightBlue : Colors.white},
        ]}>
        <View style={styles.viewDays1}>
          <Text style={styles.textHeader}>{string.DAYS}</Text>
        </View>
        <View style={styles.viewLesson1}>
          <Text style={styles.textHeader}>{string.EPISODE}</Text>
        </View>
        <View style={styles.viewExam1}>
          <Text style={styles.textHeader}>{string.EXAM}</Text>
        </View>
      </View>
    );
  };

  if (loadingSchedule) {
    return <Loading />;
  }

  return (
    <FlatList
      data={result}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={styles.flatList}
      contentContainerStyle={styles.flatListContent}
      ListHeaderComponent={FlatListHeader}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.title}${index}`}
    />
  );
};

export default MonthlyMySchedule;
