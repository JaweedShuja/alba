import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
export const googleLogin = async (setGlInfo) => {
  console.log('START GOOGLE LOGIN');
  GoogleSignin.configure({
    scopes: ['email'],
    webClientId:
      '1097684528702-66tcpd73g2r4ddf08v7hc7a4g37897ma.apps.googleusercontent.com', // what API you want to access on behalf of the user, default is email and profile
    // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  });
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    console.log({response});
    // return response;
    setGlInfo({response});
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log({error});
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log({error});

      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log({error});

      // play services not available or outdated
    } else {
      console.log({error});

      // some other error happened
    }
  }
};
