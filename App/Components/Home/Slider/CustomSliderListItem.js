import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  I18nManager,
} from 'react-native';
import Colors from 'App/Theme/Colors';
import Metrics from 'App/Theme/Metrics';
import Helpers from 'App/Theme/Helpers';
import SliderRow from './SliderRow';

const {width, height} = Dimensions.get('window');

const isIphoneX =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height === 812 || width === 812);
const LARGE_HEIGHT = height / 4.7;

const LARGE_WIDTH = width;
const SMALL_HEIGHT = height / 5;
const SMALL_WIDTH = width / 1.36;

const SliderListItem = (props) => {
  const LAYOUT_HEIGHT = props?.large ? LARGE_HEIGHT : SMALL_HEIGHT;
  const LAYOUT_WIDTH = props?.large ? LARGE_WIDTH : SMALL_WIDTH;
  let flatList = useRef();
  const [state, setState] = useState({
    width: props?.large ? LARGE_WIDTH : SMALL_WIDTH,
    height: props?.large ? LARGE_HEIGHT : SMALL_HEIGHT,
    activeIndex: 0,
  });

  const renderItem = (item) => {
    // const temp = item?.item?.coverImg?.path;
    // console.log(temp);
    const {width, height} = state;
    const topSpacer =
      (isIphoneX ? 44 : 0) +
      (Platform.OS === 'ios' ? 20 : StatusBar.currentHeight);
    const itemProps = {
      ...item,
      topSpacer,
      width,
      height,
      large: props?.large,
    };
    return <SliderRow {...itemProps} />;
  };

  let myRef = useRef(null);

  const [toch, setToch] = useState(false);
  const [moori, setMot] = useState(null);
  useEffect(() => {
    if (!toch) {
      let intrval = setInterval(() => {
        setState((state) => ({
          ...state,
          activeIndex:
            state.activeIndex === props?.slides?.length - 1
              ? 0
              : state.activeIndex + 1,
        }));
      }, 7000);
      setMot(intrval);
    } else {
      clearInterval(moori);
    }
    () => {
      return clearInterval(intrval);
    };
  }, [toch]);
  useEffect(() => {
    if (toch) {
      setTimeout(() => {
        setToch(false);
      }, 10000);
    }
  });
  useEffect(() => {
    flatList.scrollToOffset({
      offset: state.activeIndex * state.width,
      animated: true,
      duration: 1000,
    });
  }, [state.activeIndex]);
  const onMomentumScrollEnd = (e) => {
    clearInterval(moori);
    setToch(true);
    const offset = e.nativeEvent.contentOffset.x;

    const newIndex = Math.round(offset / state.width);

    setState({...state, activeIndex: newIndex});
  };

  const onLayout = () => {
    if (LAYOUT_WIDTH !== state.width || LAYOUT_HEIGHT !== state.height) {
      setState({...state, width, height});
      const func = () => {
        flatList.scrollToOffset({
          offset: state.activeIndex * state.width,
          animated: true,
        });
      };
      Platform.OS === 'android' ? setTimeout(func, 0) : func();
    }
  };
  const renderIndicator = () => {
    const {activeIndex} = state;
    return (
      <View style={styles.indicatorParent}>
        {props?.slides?.length > 1 &&
          props.slides.map((_, i) => {
            return (
              <View
                key={i}
                style={[
                  styles.indicator,
                  {
                    backgroundColor:
                      i === activeIndex ? Colors.red : Colors.white,
                  },
                ]}></View>
            );
          })}
      </View>
    );
  };
  const itemWidth = state.width;
  const separatorWidth = 10;
  const totalItemWidth = itemWidth + separatorWidth;
  return (
    <View style={[props?.large ? styles.flexOne : styles.flexTwo]}>
      <FlatList
        ref={(ref) => (flatList = ref)}
        data={props?.slides}
        horizontal
        inverted={I18nManager.isRTL}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        onMomentumScrollEnd={onMomentumScrollEnd}
        extraData={state.width}
        onLayout={props?.large && onLayout}
        keyExtractor={(item, index) => index.toString()}
        getItemLayout={(data, index) => ({
          length: totalItemWidth,
          offset: totalItemWidth * index,
          index,
        })}
        bounces={false}
      />
      {props?.indicator && renderIndicator()}
    </View>
  );
};
export default SliderListItem;
const styles = StyleSheet.create({
  flexOne: {
    marginTop: 16,
    height: LARGE_HEIGHT,
    width: LARGE_WIDTH,
    ...Metrics.verticalMargin,
    ...Helpers.center,
    // ...Metrics.powHorizontalPadding,
    // backgroundColor: 'red',
  },
  flexTwo: {
    marginTop: 16,
    height: SMALL_HEIGHT,
    width: SMALL_WIDTH,
    ...Metrics.verticalMargin,
    ...Helpers.center,
    // backgroundColor: 'red',
  },
  smallSlider: {},
  indicatorParent: {
    flex: 1,
    position: 'absolute',
    bottom: -4,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  indicator: {
    display: 'flex',
    width: 6,
    height: 6,
    borderColor: Colors.red,
    borderWidth: 0.7,
    marginStart: 4,
    borderRadius: 100,
  },
});
