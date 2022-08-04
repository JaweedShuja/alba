import React from 'react';
import Container from 'App/Components/Container';
import BanerHeader from 'App/Components/Share/BanerHeader';
import {useDummyData} from 'App/Values/DummyData';
import SpecialListStudents from 'App/Components/Special/SpecialListStudents';

const SpecialScreen = ({navigation}) => {
  const DummyData = useDummyData();
  const {SPECIAL_SCREEN_STUDENTS_OBJECT} = DummyData;

  return (
    <Container {...{navigation}}>
      <BanerHeader />
      <SpecialListStudents data={SPECIAL_SCREEN_STUDENTS_OBJECT} />
    </Container>
  );
};

export default SpecialScreen;
