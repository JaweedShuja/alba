import React from 'react';
import {ScrollView} from 'react-native';
import Container from 'App/Components/Container';
import BottomProfile from 'App/Components/Profile/BottomProfile';
import MainProfile from 'App/Components/Profile/MainProfile';
import TopProfile from 'App/Components/Profile/TopProfile';
import {useDummyData} from 'App/Values/DummyData';
import styles from './ProfileStyle';
import {useSelector} from 'react-redux';

const ProfileScreen = ({navigation}) => {
  const DummyData = useDummyData();

  const {PROFILE_SCREEN_OBJECTS} = DummyData;

  const isLoggedInSuccess = useSelector(
    (state) => state.auth.isLoggedInSuccess,
  );
  const email = useSelector((state) => state.auth.email);

  return (
    <Container basePage={true} {...{navigation}}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.content}>
        <TopProfile data={PROFILE_SCREEN_OBJECTS} {...{isLoggedInSuccess}} />
        <MainProfile
          data={PROFILE_SCREEN_OBJECTS}
          {...{isLoggedInSuccess, email}}
        />
        <BottomProfile data={PROFILE_SCREEN_OBJECTS} />
      </ScrollView>
    </Container>
  );
};

export default ProfileScreen;
