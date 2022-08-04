import React from 'react';
import {View, Dimensions} from 'react-native';
import {Colors} from 'App/Theme';
import styles from './style';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
const {width} = Dimensions.get('screen');

const TabBarIcon = ({
  focused,
  nameIcon,
  borderRight = false,
  borderLeft = false,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          borderTopLeftRadius: borderLeft == true ? width * 0.06 : 0,
          borderTopRightRadius: borderRight == true ? width * 0.06 : 0,
        },
      ]}>
      <FontIcon
        name={nameIcon}
        size={25}
        color={focused ? Colors.tabPressIn : Colors.tabPressOut}
      />
      {focused ? (
        <View
          style={[
            styles.circleView,
            {backgroundColor: focused ? Colors.tabPressIn : Colors.tabPressOut},
          ]}
        />
      ) : null}
    </View>
  );
};

export default TabBarIcon;

/* <Icon
        name={nameIcon}
        size={25}
        style={styles.Icon}
        color={focused ? Colors.tabPressIn : Colors.tabPressOut}
      /> */
