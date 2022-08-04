import React from 'react';
import {ScrollView} from 'react-native';
import styles from './style';
import TextQuestion from 'App/Components/Special/TextQuestion';
import ClassicQuestion from 'App/Components/Special/ClassicQuestion';

const Exam = ({data}) => {
  const temp = data[0];
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      {temp.type == 'image' ? (
        <ClassicQuestion data={temp} />
      ) : (
        <TextQuestion data={temp} />
      )}
    </ScrollView>
  );
};

export default Exam;
