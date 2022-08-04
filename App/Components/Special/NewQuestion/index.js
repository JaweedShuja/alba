import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {Colors} from 'App/Theme';
import Strings from 'App/Values/Strings';
import styles from './style';
import FontIcon from 'App/Components/CustomIcon/FontIcon';

import {normal} from 'App/Theme/Metrics';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const NewQuestion = ({
  question,
  onSubmitAddNewQuestion,
  onSubmitCurrentQuestion,
  removeQuestion,
  uploading,
}) => {
  const Item = ({index, item}) => {
    const [showToolTip, setShowToolTip] = useState(false);
    return (
      <>
        {item?.add ? null : (
          <TouchableOpacity
            disabled={uploading}
            style={[
              styles.mainBTN,
              {backgroundColor: uploading ? Colors.commonGray : item?.color},
            ]}
            activeOpacity={ACTIVE_OPACITY}
            onPress={onSubmitCurrentQuestion.bind(null, index)}
            onLongPress={() => {
              setShowToolTip(true);
            }}>
            <Text
              style={[
                styles.text,
                {
                  color:
                    item?.color == Colors.white
                      ? Colors.commonGray
                      : Colors.white,
                },
              ]}>
              {index + 1}
            </Text>
            {showToolTip && (
              <TouchableOpacity
                style={styles.deleteBtn}
                activeOpacity={ACTIVE_OPACITY}
                onPress={removeQuestion.bind(null, index)}>
                <FontIcon
                  name={Strings.Icons.TRASH}
                  size={normal * 2}
                  color={Colors.white}
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
      </>
    );
  };
  const renderItem = ({item, index}) => <Item index={index} item={item} />;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={uploading}
        style={[
          styles.mainBTN,
          {backgroundColor: uploading ? Colors.commonGray : Colors.green},
        ]}
        activeOpacity={ACTIVE_OPACITY}
        onPress={onSubmitAddNewQuestion.bind(null, question?.length - 1)}>
        <FontIcon
          name={Strings.Icons.PLUS}
          color={Colors.white}
          size={normal * 1.3}
        />
      </TouchableOpacity>
      <FlatList
        data={question}
        keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.title}${index}`}
        inverted={true}
      />
    </View>
  );
};

export default NewQuestion;

/* <Text style={styles.textHeader}>Physics Of March</Text> */

// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'First Item',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Second Item',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//   },
// ];

// if (item?.add) {
//   return (
//     <TouchableOpacity
//       disabled={uploading}
//       style={[
//         styles.mainBTN,
//         {backgroundColor: uploading ? Colors.commonGray : Colors.green},
//       ]}
//       activeOpacity={ACTIVE_OPACITY}
//       onPress={
//         onSubmitAddNewQuestion.bind(null, index)
//         //() => console.log('+++=>', question)
//       }>
//       <FontIcon
//         name={Strings.Icons.PLUS}
//         color={Colors.white}
//         size={normal * 1.3}
//       />
//     </TouchableOpacity>
//   );
// }
