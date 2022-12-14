import {Platform} from 'react-native';

const Shadow = ({
  color,
  opacity,
  radius,
  offsetWidth,
  offsetHeight,
  elevation,
}) => {
  return Platform.select({
    ios: {
      shadowColor: color,
      shadowOpacity: opacity,
      shadowRadius: radius,
      shadowOffset: {
        width: offsetWidth,
        height: offsetHeight,
      },
    },
    android: {
      elevation,
    },
    web: {
      boxShadow: `${offsetWidth}px ${offsetHeight}px ${radius}px ${color}`,
    },
  });
};

export default Shadow;
