import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import {useSelector} from 'react-redux';
import Loading from 'App/Components/Share/Loading';
import {getLightnessOfRGB} from '../../../utils/getLightnessOfRGB';
import {string} from 'App/i18n';
import FontIcon from 'App/Components/CustomIcon/FontIcon';

const ShopList = ({data}) => {
  const loading = useSelector((state) => state.appData.getStationeriesLoading);

  const onItemPressed = (item) => {
    //navigate(STUDENT_STACK, {screen: ACTIVATION_SUCCESS_SCREEN, params: item});
  };

  const Item = ({index, item}) => {
    let color = getLightnessOfRGB(item?.color);
    if (color != 'light') color = Colors.white;
    else color = Colors.text;
    return (
      <View
        style={styles.mainBTN}
        //activeOpacity={ACTIVE_OPACITY}
        //onPress={onItemPressed.bind(null, item)}
      >
        <View style={styles.view}>
          <FontIcon
            name={Strings.Icons.SHOP}
            color={Colors.lightBlue}
            size={normal * 1.5}
          />
          <Text style={styles.text} numberOfLines={1}>
            {string.SHOP} {item?.name}
          </Text>
        </View>
        <View style={styles.view}>
          <FontIcon
            name={Strings.Icons.LOCATION}
            color={Colors.lightBlue}
            size={normal * 1.5}
          />
          <Text style={styles.text} numberOfLines={3}>
            {string.ADDRESS} {item?.address}
          </Text>
        </View>
        <View style={[styles.viewCity, {backgroundColor: item?.color}]}>
          <Text style={[styles.textName, {color: color}]}>{item?.city}</Text>
        </View>
      </View>
    );
  };
  const renderItem = ({item, index}) => <Item index={index} item={item} />;

  if (loading) {
    return <Loading />;
  }

  return (
    <FlatList
      data={data}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.FlatList}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.title}${index}`}
    />
  );
};

export default ShopList;
