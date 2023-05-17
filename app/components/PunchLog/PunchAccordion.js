import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const PunchAccordion = ({item, accordionIndex, expanded, toggleExpand}) => (
  <View style={{paddingVertical: 10}}>
    <TouchableOpacity onPress={() => toggleExpand(accordionIndex)}>
      <View style={styles.titleWrapper}>
        <View>
          <Text style={styles.logDateTitleStyle}>Log Date</Text>
          <Text style={styles.logValueStyle}>{item.log_date}</Text>
        </View>
        <View>
          <Text style={styles.logDateTitleStyle}>Break Time</Text>
          <Text style={styles.logValueStyle}>{item.breakTime} Minutes</Text>
        </View>
        <Icon
          name={
            expanded.includes(accordionIndex) ? 'chevron-up' : 'chevron-down'
          }
          size={32}
          color="#333"
        />
      </View>
    </TouchableOpacity>
    {expanded.includes(accordionIndex) && (
      <View style={styles.details}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <View style={styles.sectionViewStyle}>
            <Text style={styles.sectionTitleStyle}>Log In Time</Text>
            {item?.login?.map((login, index) => {
              return (
                <Text key={index} style={styles.logValueStyle}>
                  {login}
                </Text>
              )
            })}
          </View>
          <View style={styles.sectionViewStyle}>
            <Text style={styles.sectionTitleStyle}>Log Out Time</Text>
            {item?.logout?.map((logout, index) => {
              return (
                <Text key={index} style={styles.logValueStyle}>
                  {logout}
                </Text>
              )
            })}
          </View>
          <View style={styles.sectionViewStyle}>
            <Text style={styles.sectionTitleStyle}>Duration</Text>
            <Text style={styles.logValueStyle}>{item?.total_durations}</Text>
          </View>
        </View>
      </View>
    )}
  </View>
)

export default PunchAccordion

const styles = StyleSheet.create({
  titleWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: 'rgba(0, 0, 0, 0.15)',
  },
  logDateTitleStyle: {fontSize: 16, fontWeight: '600', marginBottom: 5},
  sectionTitleStyle: {
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 5,
  },
  sectionViewStyle: {
    width: '40%',
  },
  logValueStyle: {
    fontWeight: 'bold',
    color: '#808080B3',
  },
  details: {paddingVertical: 10, paddingHorizontal: 15},
})
