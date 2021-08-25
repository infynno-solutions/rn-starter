import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const CustomHeader = ({name, navigation}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.headerBack}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
    flex: 0,
    flexDirection: 'row',
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerBack: {
    marginRight: 20,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
})

export default CustomHeader
