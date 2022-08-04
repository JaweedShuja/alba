import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import Modal from '../Modal';
import styles from './style';
import ChooseBtn from '../ChooseBtn';

const CategoryModal = ({modalVisible, onClose, screen}) => {
  const data = useSelector((state) => state.appData.getCategoriesData);
  const userType = useSelector((state) => state.appData.isTeacher);
  const currentCat = useSelector((state) => state.appData.currentCategoryId);
  const [choose, setChoose] = useState([]);
  let Object = [];

  const onPressChooseItem = (index, _id, title) => {
    Object.forEach(function (item, index, array) {
      Object[index] = false;
      setChoose(Object);
    });
    Object[index] = true;
    const categoryId = _id;
  };

  const Item = ({index, item}) => {
    index > 0 && Object.push(false);
    return (
      <ChooseBtn
        title={item?.title}
        choose={choose[index]}
        submit={onPressChooseItem.bind(null, index, item?._id, item?.title)}
      />
    );
  };

  const renderItem = ({item, index}) => <Item index={index} item={item} />;

  return (
    <Modal visible={modalVisible} onCloseActionSheet={onClose}>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.FlatList}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.title}${index}`}
      />
    </Modal>
  );
};

export default CategoryModal;
