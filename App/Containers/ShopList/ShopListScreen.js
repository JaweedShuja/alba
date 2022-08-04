import React, {useEffect} from 'react';
import {Text} from 'react-native';
import styles from './ShopListStyle';
import Container from 'App/Components/Container';
import BanerHeader from 'App/Components/Share/BanerHeader';
import ShopList from 'App/Components/Home/ShopList';
import {useDispatch, useSelector} from 'react-redux';
import AppDataActions from 'App/Stores/AppData/Actions';
import EmptyView from '../../Components/Share/EmptyView';
import {string} from 'App/i18n';
import Loading from 'App/Components/Share/Loading';

const ShopListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AppDataActions.getStationeries());
  }, []);
  const data = useSelector((state) => state.appData.getStationeriesData);
  const loading = useSelector((state) => state.appData.getStationeriesLoading);
  console.log(data);

  return (
    <Container {...{navigation}}>
      <BanerHeader back />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Text style={styles.text}>
            {string.PLACES_YOU_CAN_BUY_ACTIVATION_CODE}
          </Text>
          {data.length === 0 ? <EmptyView /> : <ShopList {...{data}} />}
        </>
      )}
    </Container>
  );
};

export default ShopListScreen;

//import DummyData from 'App/Values/DummyData';

//const {SHOP_LIST_OBJECTS} = DummyData.Data;
