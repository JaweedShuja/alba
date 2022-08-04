import React from 'react';
import {DrawerActions} from '@react-navigation/native';
import {StackActions} from '@react-navigation/routers';

export const isReadyRef = React.createRef();
export const navigationRef = React.createRef();

export const toggleDrawer = () => {
  navigationRef?.current.dispatch(DrawerActions.toggleDrawer());
};

export const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};

export const navigateAndReset = (route) => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef?.current?.reset({
      index: 0,
      routes: [{name: route}],
    });
  }
};

export const push = (name, params) => {
  navigationRef.current &&
    navigationRef?.current?.dispatch(StackActions.push(name, params));
};

export const goBack = () => {
  navigationRef.current?.goBack();
};

export default {
  navigate,
  navigateAndReset,
  goBack,
  push,
  // setTopLevelNavigator,
};
