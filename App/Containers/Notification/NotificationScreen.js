import React, {useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import EmptyView from '../../Components/Share/EmptyView/index';
import Header from 'App/Components/Share/Header';
import Container from 'App/Components/Container';
import {useSelector, useDispatch} from 'react-redux';
import {string} from '../../i18n/index';
import NotificationList from '../../Components/Special/NotificationList';
import AppDataActions from '../../Stores/AppData/Actions';
import styles from './NotificationStyle';
import NotificationHeaderList from '../../Components/Special/NotificationHeaderList';
import Loading from 'App/Components/Share/Loading';
const NotificationScreen = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AppDataActions.getInforms());
  }, []);
  const data = useSelector((state) => state.appData.getInformsSuccess);
  console.log('NotificationScreen', data);
  const loading = useSelector((state) => state.appData.getInformsLoading);

  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} title={string.NOTIFICATION} />

      {loading ? (
        <Loading />
      ) : data?.length === 0 ? (
        <EmptyView />
      ) : (
        <NotificationList {...{data}} />
      )}
    </Container>
  );
};

export default NotificationScreen;
