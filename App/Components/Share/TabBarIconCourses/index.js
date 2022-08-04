import React from 'react';
import {View, ImageBackground} from 'react-native';
import {Colors} from 'App/Theme';
import styles from './style';
import Strings from 'App/Values/Strings';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
const {TAB_BAR_IMAGE} = Strings.ImageAddress;

const TabBarIconCourses = ({focused, nameIcon, sizeIcon, colorIcon}) => {
  return (
    <ImageBackground style={styles.container} source={TAB_BAR_IMAGE}>
      <View style={styles.viewIcon}>
        <View style={styles.view}>
          <FontIcon name={nameIcon} size={sizeIcon} color={colorIcon} />
        </View>
      </View>

      {focused ? (
        <View
          style={[
            styles.circleView,
            {
              backgroundColor: focused ? Colors.tabPressIn : Colors.tabPressOut,
            },
          ]}
        />
      ) : null}
    </ImageBackground>
  );
};

export default TabBarIconCourses;

/* <Icon
            name={nameIcon}
            size={30}
            style={styles.Icon}
            color={Colors.white}
            //   color={focused ? Colors.tabPressIn : Colors.tabPressOut}
          /> */
