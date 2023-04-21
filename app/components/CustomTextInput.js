import React from 'react'
import {View, TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Config} from '../common'

const CustomTextInput = ({error, ...props}) => {
  // console.warn(props.editable);
  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 0,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: error !== undefined ? Config.errorColor : '#e2e2e2',
        marginBottom: 15,
      }}>
      <TextInput
        style={{
          // fontWeight: 'bold',
          flex: 1,
          color: '#000',
        }}
        {...props}
      />
      {error !== undefined && (
        <Icon name="alert-circle-outline" size={24} color={Config.errorColor} />
      )}
    </View>
  )
}

export default CustomTextInput
