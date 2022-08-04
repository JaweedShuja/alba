import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

export const signUpFacebook = async (setFbInfo) => {
  const getResponseInfo = (error, result) => {
    if (error) {
      //Alert for the Error
      alert('Error fetching data: ' + error.toString());
    } else {
      console.log({RESULT_DATA: result});
      setFbInfo(result);
      // return result;
    }
  };
  return LoginManager.logInWithPermissions(['public_profile', 'email']).then(
    function (result) {
      if (result.isCancelled) {
        console.log('Login cancelled');
        //setFbInfo(null);
      } else {
        console.log({result});
        // setFbInfo(result);
        console.log(
          'Login success with permissions: ' +
            result.grantedPermissions.toString(),
        );
        AccessToken.getCurrentAccessToken()
          .then((data) => {
            console.log({data});
            const processRequest = new GraphRequest(
              '/me?fields=email,gender,locale,name,friends,posts,picture.type(large)',
              null,
              getResponseInfo,
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(processRequest).start();
          })
          .catch((error) => {
            console.log({error});
            //setFbInfo(null);
          });
      }
    },
    function (error) {
      console.log('Login fail with error: ' + error);
      console.log({error});
      //setFbInfo(null);
    },
  );
};

export const facebookSignIn = async () => {
  let result;
  const request = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (request.isCancelled) {
    result = {success: false, message: 'User cancelled the login process'};
  } else {
    const accessData = await AccessToken.getCurrentAccessToken();
    result = await new Promise((resolve, reject) => {
      const infoRequest = new GraphRequest(
        '/me',
        {
          accessToken: accessData.accessToken,
          parameters: {
            fields: {
              string: 'id, email, first_name, last_name, picture.type(large)',
            },
          },
        },
        (error, response) => {
          if (error) {
            resolve({success: false, message: JSON.stringify(error)});
          } else {
            resolve({success: true, data: response});
          }
        },
      );
      // Execute the graph request created above
      new GraphRequestManager().addRequest(infoRequest).start();
    })
      .then(async (response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  return result;
};
