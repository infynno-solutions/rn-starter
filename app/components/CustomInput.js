import React from 'react'
import {TouchableOpacity, Text} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Config} from '../common'

const CustomInput = ({error, children, ...props}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        flex: 0,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: error !== undefined ? Config.errorColor : '#e2e2e2',
        marginBottom: 15,
      }}
      {...props}>
      <Text
        style={{
          flex: 1,
          color: '#000',
          padding: 10,
        }}>
        {props.text}
      </Text>
      {error !== undefined && (
        <Icon name="alert-circle-outline" size={24} color={Config.errorColor} />
      )}
    </TouchableOpacity>
  )
}

export default CustomInput
