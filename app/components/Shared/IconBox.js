import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Config} from '../../common'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const IconBox = ({icon, count, name, backgroundColor, color, testID}) => {
  return (
    <View style={styles.boxContainer} testID={testID}>
      <View
        style={[
          {
            backgroundColor: backgroundColor
              ? backgroundColor
              : Config.primayColor,
          },
          styles.iconContainer,
        ]}>
        <Icon
          name={icon}
          size={32}
          // style={styles.icon}
          color={color ? color : Config.primaryDark}
        />
      </View>
      <View>
        <Text style={styles.count}>{count}</Text>
        <Text style={styles.boxTitle}>{name}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: {width: 2, height: 1},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 0.5,
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 20,
    borderRadius: 50,
    padding: 15,
  },
  icon: {
    color: 'rgba(0,0,0,0.50)',
  },
  count: {
    fontSize: 18,
  },
  boxTitle: {
    color: Config.textColor,
    fontSize: 16,
  },
})

export default IconBox
