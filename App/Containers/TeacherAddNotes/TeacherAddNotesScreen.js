import React from 'react';
import Header from 'App/Components/Share/Header';
import Container from 'App/Components/Container';
import TeacherAddNote from '../../Components/Special/TeacherAddNote';
import {string} from 'App/i18n';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';

const TeacherAddNotesScreen = ({navigation, route: {params}}) => {
  const courseId = params?.courseId;

  return (
    <Container {...{navigation}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1, backgroundColor: 'white'}} {...{navigation}}>
          <Header {...{navigation}} title={string.ADD_NOTE} />
          <TeacherAddNote {...{navigation}} {...{courseId}} />
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default TeacherAddNotesScreen;
