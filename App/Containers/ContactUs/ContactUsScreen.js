import React, {useEffect, useState} from 'react';
import {ScrollView, Platform} from 'react-native';
import styles from './ContactUsStyle';
import Container from 'App/Components/Container';
import Header from 'App/Components/Share/Header';
import {useDummyData} from 'App/Values/DummyData';
import ContactUsTop from 'App/Components/ContactUs/ContactUsTop';
import ContactUsMain from 'App/Components/ContactUs/ContactUsMain';
import ContactUsBottom from 'App/Components/ContactUs/ContactUsBottom';
import {useDispatch, useSelector} from 'react-redux';
import AppDataActions from 'App/Stores/AppData/Actions';
import {string} from 'App/i18n';
import Loading from 'App/Components/Share/Loading';
import UserChatActions from '../../Stores/UserChats/Actions';
import {showToast} from '../../utils/showToast';

const ContactUsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state?.socket?.socket);
  const [supportData, setSupportData] = useState(null);
  const _idUser = useSelector((state) => state?.auth?.userProfileData?._id);
  const DummyData = useDummyData();
  const {CONTACT_US_SCREEN_OBJECT} = DummyData;

  const contactInfo = useSelector((state) => state?.appData?.contactInfo);
  const loading = useSelector((state) => state?.appData?.getContactInfoLoading);
  const isConnectedNetwork = useSelector(
    (state) => state?.network?.isConnected,
  );

  const getSupport = () => {
    socket &&
      socket.emit('GetSupport', {}, (res) => {
        console.log('RES  GetSupport EMIT', res?.data?.payload);
        if (res?.code === 200) {
          setSupportData(res?.data?.payload);
        }
      });
  };

  useEffect(() => {
    dispatch(AppDataActions.getContactInfo());
    getSupport();
  }, []);

  const onSendMessageSupport = (text, clearMessage) => {
    if (!_idUser) {
      return showToast('e', 'Please Login First');
    }
    const message = {
      text: text,
      user: {
        _id: _idUser,
        // name: firstName,
      },
      sent: true,
      received: true,
      status: isConnectedNetwork ? 0 : text && text.length ? 3 : 2,
    };
    if (text && text.length) {
      message.status = 1;
      dispatch(
        UserChatActions.handleNewTextMessage(
          supportData?.chat,
          message,
          supportData?._id,
        ),
      );
      clearMessage();
    }
  };

  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} title={string.CONTACT_US} />
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          <ContactUsTop data={contactInfo} />
          <ContactUsMain
            {...{onSendMessageSupport}}
            data={CONTACT_US_SCREEN_OBJECT}
          />
          {Platform.OS === 'android' && <ContactUsBottom data={contactInfo} />}
        </ScrollView>
      )}
    </Container>
  );
};

export default ContactUsScreen;
