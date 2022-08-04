import Container from 'App/Components/Container';
import ForgetPassword from 'App/Components/Home/ForgetPassword';
import Header from 'App/Components/Share/Header';
import {string} from 'App/i18n';
import React, {useEffect} from 'react';
import Strings from 'App/Values/Strings';
import {Keyboard, Linking, Pressable, ScrollView, View} from 'react-native';
import {navigate} from 'App/Services/NavigationService';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const {STUDENT_STACK} = Strings.Routes;

const ForgetPasswordScreen = ({navigation, route}) => {
  const link = route?.params?.link;

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url != null) {
        handleDeepLink(url);
      }
    });
    Linking.addEventListener('url', (e) => handleDeepLink(e?.url));
    return () => {
      Linking.removeEventListener('url');
    };
  }, []);

  const handleDeepLink = (url) => {
    const action = url?.split('/');
    if (url) {
      navigate(STUDENT_STACK, {
        screen: action[2],
        params: {token: action[3]},
      });
    }
  };
  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} title={string.FORGET_PASSWORD} />
      <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
        <ForgetPassword {...{link}} />
      </Pressable>
    </Container>
  );
};

export default ForgetPasswordScreen;

// useEffect(() => {
//   const backHandler = BackHandler.addEventListener(
//     'hardwareBackPress',
//     backAction,
//   );

//   return () => {
//     backHandler.remove();
//   };
// }, []);

// const backAction = () => {
//   navigation.goBack();
//   console.log('back');
//   return true;
// };

// const [url, setUrl] = useState(null);
// const [processing, setProcessing] = useState(true);

// useEffect(() => {
//   const url = Linking.addEventListener('url', getUrlAsync);
//   return {url, processing};
// }, []);

// const getUrlAsync = async () => {
//   // Get the deep link used to open the app
//   const initialUrl = await Linking.getInitialURL();
//   console.log('container', {initialUrl});

//   var fields = initialUrl?.split('/');

//   if (initialUrl) {
//     navigate(STUDENT_STACK, {
//       screen: fields[2],
//       params: {token: fields[3]},
//     });
//   }
//   // The setTimeout is just for testing purpose
//   setTimeout(() => {
//     setUrl(initialUrl);
//     setProcessing(false);
//   }, 1000);
// };
