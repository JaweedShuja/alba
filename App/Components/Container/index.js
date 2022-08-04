import React, {useState, useEffect} from 'react';
import {SafeAreaView, Platform, View} from 'react-native';
import {Metrics} from 'App/Theme';
import styles from './style';
import Loading from '../Share/Loading';

const Container = ({navigation, basePage = false, children}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTimeout(() => {
        setLoading(false);
      }, 0);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  if (Platform.OS === 'ios') {
    return (
      <View
        style={[
          styles.container,
          {
            paddingHorizontal:
              basePage == true
                ? Metrics.paddingHorizontalMain.paddingHorizontal
                : null,
          },
        ]}>
        {loading ? <Loading /> : children}
      </View>
    );
  }
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingHorizontal:
            basePage == true
              ? Metrics.paddingHorizontalMain.paddingHorizontal
              : 0,
        },
      ]}>
      {loading ? <Loading /> : children}
    </SafeAreaView>
  );
};

export default Container;
