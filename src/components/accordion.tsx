import React, {useState} from 'react';
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import appStyle from '../styles/appStyle';
import Icons from './vectorIconSet';
import colors from '../constants/color';
import {AccordionData} from '../interfaces/componentsInterface/componentInterfaces';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function Accordion({
  data,
  customMainContainerStyle,
  customItemStyle,
}: AccordionData) {
  return (
    <View style={[styles.container, customMainContainerStyle]}>
      {data?.map((e, x) => (
        <Item data={e?.itemData || []} customItemStyle={customItemStyle} />
      ))}
    </View>
  );
}

function Item({data, customItemStyle, itemTextStyle}: AccordionData) {
  const [open, setopen] = useState(false);
  const onPress = () => {
    LayoutAnimation.easeInEaseOut();
    setopen(!open);
  };
  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={1}>
      <View style={styles.row}>
        <Text style={[appStyle.textHeaderStyle, {flex: 1}]}>Header</Text>
        <Icons.Ionicons name="chevron-down" size={18} color={colors.black} />
      </View>
      {open &&
        data.map((e, x) => (
          <View style={[styles.itemContainer, customItemStyle]}>
            <Text key={x} style={[styles.subItem, itemTextStyle]}>
              {e.label}
            </Text>
          </View>
        ))}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingVertical: 10,
  },
  itemContainer: {
    paddingTop: 15,
  },
  item: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.lightgray,
    paddingHorizontal: 10,
    overflow: 'hidden',
    borderRadius: 5,
    paddingVertical: 12,
    backgroundColor: colors.lightgray,
    marginBottom: 5,
  },
  subItem: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
