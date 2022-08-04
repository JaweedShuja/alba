import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import SliderListItem from './CustomSliderListItem';
import DummyData from 'App/Values/DummyData';
import {useQuery} from '@apollo/client';
import styles from './style';
// import queries from 'App/Services/graphql/queries';
const CustomSlider = ({sliderData, large = true, indicator}) => {
  // console.log({sliderData});

  // const {data, error} = useQuery(queries.SLIDES, {
  //   variables: {
  //     queryOptions: {
  //       page: 0,
  //       limit: 5,
  //     },
  //   },
  // });

  // not STYLES set Yer
  const sliderPlaceHolder = () => {
    return (
      <View
        style={[large ? styles.sliderPlaceHolder : styles.smallPlaceHolder]}
      />
    );
  };

  // const sliders = data?.sliders[0]?.slides || [];
  // console.log({data, error, sliderData});

  return <SliderListItem large={large} slides={sliderData} />;
};
export default CustomSlider;
