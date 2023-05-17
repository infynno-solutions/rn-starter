import {Picker} from '@react-native-picker/picker'
import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import Images from '../../../assets/images'
import {Config} from '../../common'
import {getAllMonth, getYears} from '../../utills/helper'
import {getPunchLogList} from '../Projects/ProjectsActions'
import PunchAccordion from './PunchAccordion'

const PunchLog = ({navigation}) => {
  const dispatch = useDispatch()

  const [expanded, setExpanded] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState({
    month: Number(moment().format('M')),
    year: Number(moment().year()),
  })

  const {punchLogList} = useSelector((state) => state.ProjectsReducers)
  useEffect(() => {
    const params = {
      month: selectedFilter.month,
      year: selectedFilter.year,
    }
    dispatch(getPunchLogList(navigation, params))
  }, [selectedFilter, dispatch, navigation])

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.historyItem}>
        <PunchAccordion
          key={index}
          accordionIndex={index}
          item={item}
          toggleExpand={() => {
            if (expanded.includes(index)) {
              setExpanded(expanded.filter((ele) => ele !== index))
            } else {
              setExpanded([...expanded, index])
            }
          }}
          expanded={expanded}
        />
      </View>
    )
  }

  const onRefresh = () => {
    setRefreshing(true)
    setExpanded([])
    const params = {
      month: Number(moment().format('M')),
      year: Number(moment().year()),
    }
    setSelectedFilter({
      month: Number(moment().format('M')),
      year: Number(moment().year()),
    })
    dispatch(getPunchLogList(navigation, params))
    setRefreshing(false)
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.containerViewStyle}>
        <View style={styles.timeViewStyle}>
          <View style={styles.pickerStyle}>
            <View style={styles.pickerView}>
              <Picker
                style={styles.pickerSelectStyle}
                placeholder={{
                  label: 'Select State',
                  value: '',
                }}
                mode="dropdown"
                selectedValue={selectedFilter.month}
                onValueChange={(itemValue) =>
                  setSelectedFilter({
                    ...selectedFilter,
                    month: itemValue,
                  })
                }>
                {getAllMonth().map((month, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={month.month.toString()}
                      value={Number(month.value)}
                    />
                  )
                })}
              </Picker>
            </View>
          </View>
          <View style={styles.pickerStyle}>
            <View style={styles.pickerView}>
              <Picker
                style={styles.pickerSelectStyle}
                mode="dropdown"
                selectedValue={selectedFilter.year}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedFilter({
                    ...selectedFilter,
                    year: itemValue,
                  })
                }>
                {getYears().map((year, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={year.toString()}
                      value={Number(year)}
                    />
                  )
                })}
              </Picker>
            </View>
          </View>
        </View>

        {punchLogList && !punchLogList?.loading ? (
          <FlatList
            data={punchLogList?.data || []}
            keyExtractor={(_, index) => String(index)}
            numColumns={1}
            style={{marginTop: 10, height: '95%'}}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <View style={styles.noPunchLog}>
                <Image source={Images.noDataFound} style={styles.noDataFound} />
                <Text style={styles.noPunchLogText}>No PunchLogs.</Text>
              </View>
            }
          />
        ) : (
          <View style={styles.loaderViewStyle}>
            <ActivityIndicator size="large" color={Config.primayColor} />
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default PunchLog

const styles = StyleSheet.create({
  historyItem: {
    flex: 0.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6.27,
    elevation: 10,
    margin: 10,
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10,
  },
  containerViewStyle: {
    paddingVertical: 10,
    marginBottom: 50,
  },
  logsViewStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logTextStyle: {
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  pickerView: {
    borderColor: '#b6c0cb',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },
  pickerSelectStyle: {
    height: 50,
  },
  pickerStyle: {width: '40%', paddingRight: 10},
  timeViewStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  formInputTitle: {
    fontWeight: 'bold',
    color: '#b6c0cb',
    fontSize: 16,
  },
  loaderViewStyle: {
    height: '90%',
    justifyContent: 'center',
  },
  noDataFound: {
    height: 50,
    width: 50,
  },
  noPunchLog: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPunchLogText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
})
