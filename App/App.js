import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import createStore from 'App/Stores';
import RootScreen from './Containers/Root/RootScreen';
import {ApolloProvider} from '@apollo/react-hooks';
import {client} from './Services/apolloConfig';
import Toast from 'react-native-toast-message';
import {ReduxNetworkProvider} from 'react-native-offline';
import {Config} from 'App/Config';

// import firebase from '@firebase/app';
// import '@firebase/auth';
export const {store, persistor} = createStore();
export const resetStores = () => store.dispatch({type: 'RESET_ACTION'});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ReduxNetworkProvider
          pingOnlyIfOffline
          pingServerUrl={Config.PING_SERVER_URL}
          pingTimeout={Config.PING_TIME_OUT}>
          <PersistGate loading={null} persistor={persistor}>
            <RootScreen />
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </PersistGate>
        </ReduxNetworkProvider>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
