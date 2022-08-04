import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import jwt_decode from 'jwt-decode';

export const AppleSignin = async (setAppleInfo) => {
  auth().signOut();
  console.log('HELLO');
  // performs login request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });
  console.log({appleAuthRequestResponse});
  // get current authentication state for user
  // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  const credentialState = await appleAuth.getCredentialStateForUser(
    appleAuthRequestResponse.user,
  );
  console.log({credentialState});

  // firebase
  const {identityToken, nonce} = appleAuthRequestResponse;
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce,
  );
  console.log({appleCredential});
  auth().signInWithCredential(appleCredential);

  let email = appleAuthRequestResponse.email;
  if (email === null) {
    email = jwt_decode(appleAuthRequestResponse.identityToken).email;
    appleAuthRequestResponse.email = email;
  }

  // use credentialState response to ensure the user is authenticated
  if (credentialState === appleAuth.State.AUTHORIZED) {
    // user is authenticated
    // return appleCredential;
    setAppleInfo(appleAuthRequestResponse);
  }
};
