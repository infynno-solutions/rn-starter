import React, {useEffect, useState} from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Config} from '../../common'
import OverTimeBottomSheet from './OverTimeBottomSheet'
import {Picker} from '@react-native-picker/picker'
import {useDispatch, useSelector} from 'react-redux'
import {fetchProjects, getExtraLogsList} from '../Projects/ProjectsActions'
import {DatePickerModal} from 'react-native-paper-dates'
import moment from 'moment'
import Images from '../../../assets/images'

const OverTime = ({navigation}) => {
  const [expanded, setExpanded] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const [filter, setFilter] = useState({
    projectId: 0,
    start_date: moment().startOf('month').format('YYYY-MM-DD'),
    end_date: moment().endOf('month').format('YYYY-MM-DD'),
  })
  const [visibleDatePicker, setVisibleDatePicker] = useState(false)
  const dispatch = useDispatch()

  const {projects, extraLogList} = useSelector(
    (state) => state.ProjectsReducers
  )

  useEffect(() => {
    dispatch(fetchProjects(navigation))
    const params = {
      date_range: `${filter.start_date},${filter.end_date}`,
      project_id: filter.projectId,
    }
    dispatch(getExtraLogsList(navigation, params))
  }, [filter, dispatch, navigation])

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.historyItem}>
        <OverTimeAccordion
          key={index}
          item={item}
          ovetTimeIndex={index}
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

  const onDismiss = React.useCallback(() => {
    setVisibleDatePicker(false)
  }, [setVisibleDatePicker])

  const onChange = React.useCallback(({startDate, endDate}) => {
    setVisibleDatePicker(false)
    setFilter({
      ...filter,
      start_date: moment(startDate).format('YYYY-MM-DD'),
      end_date: moment(endDate).format('YYYY-MM-DD'),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    setExpanded([])
    dispatch(fetchProjects(navigation))
    const params = {
      date_range: `${moment().startOf('month').format('YYYY-MM-DD')},${moment()
        .endOf('month')
        .format('YYYY-MM-DD')}`,
      project_id: 0,
    }
    setFilter({
      projectId: 0,
      start_date: moment().startOf('month').format('YYYY-MM-DD'),
      end_date: moment().endOf('month').format('YYYY-MM-DD'),
    })
    dispatch(getExtraLogsList(navigation, params))
    setRefreshing(false)
  }

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.containerViewStyle}>
          <View style={styles.logsViewStyle}>
            <TouchableOpacity
              style={styles.extraHourTextStyle}
              onPress={() => setIsVisible(true)}>
              <Text style={styles.logTextStyle}>+ Add Extra Hour</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.projectViewStyle}
            onPress={() => setVisibleDatePicker(true)}>
            <Text style={styles.formInputTitle}>Date:</Text>
            <Text style={{padding: 5, fontWeight: '500'}}>
              {moment(filter.start_date, 'YYYY-MM-DD').format('DD-MM-YYYY')} -{' '}
              {moment(filter.end_date, 'YYYY-MM-DD').format('DD-MM-YYYY')}
            </Text>
            <View style={styles.formInput} />
          </TouchableOpacity>
          <View style={styles.projectViewStyle}>
            <Text style={styles.formInputTitle}>Projects</Text>
            <Picker
              selectedValue={filter.projectId}
              enabled
              mode="dropdown"
              onValueChange={(itemValue) => {
                setFilter({
                  ...filter,
                  projectId: itemValue,
                })
              }}>
              <Picker.Item
                label={'Project Select'}
                value={Number(0)}
                style={{color: '#80808066'}}
              />
              {projects?.projects.length > 0 &&
                projects?.projects.map((project) => {
                  return (
                    <Picker.Item
                      key={project.project_id}
                      label={project.name}
                      value={Number(project.project_id)}
                      style={
                        filter.projectId === project.id
                          ? {
                              color: '#000000',
                            }
                          : {color: '#000000B3'}
                      }
                    />
                  )
                })}
            </Picker>
            <View style={styles.formInput} />
          </View>

          {extraLogList && !extraLogList?.loading ? (
            <View>
              <FlatList
                style={{height: '72%'}}
                data={extraLogList?.data?.extraWorkLogs || []}
                keyExtractor={(_, index) => String(index)}
                numColumns={1}
                renderItem={renderItem}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                ListEmptyComponent={
                  <View style={styles.noExtraLog}>
                    <Image
                      source={Images.noDataFound}
                      style={styles.noDataFound}
                    />
                    <Text style={styles.noExtraLogText}>No Extra logs.</Text>
                  </View>
                }
              />
            </View>
          ) : (
            <View style={styles.loaderViewStyle}>
              <ActivityIndicator size="large" color={Config.primayColor} />
            </View>
          )}
        </View>

        {isVisible && (
          <OverTimeBottomSheet
            navigation={navigation}
            isVisible={isVisible}
            setIsVisible={() => setIsVisible(false)}
            setFilter={setFilter}
          />
        )}
        <DatePickerModal
          mode="range"
          locale="en-GB"
          visible={visibleDatePicker}
          onDismiss={onDismiss}
          startDate={moment(filter.start_date, 'YYYY-MM-DD').toDate()}
          endDate={moment(filter.end_date, 'YYYY-MM-DD').toDate()}
          onConfirm={onChange}
          saveLabel="Save"
          label="Select period"
          startLabel="From"
          endLabel="To"
          calendarIcon={'none'}
          editIcon={'none'}
          disableSafeTop={true}
          animationType="fade"
          disableStatusBar={true}
        />
      </SafeAreaView>
    </>
  )
}

export default OverTime

const OverTimeAccordion = ({item, expanded, ovetTimeIndex, toggleExpand}) => (
  <View style={{paddingVertical: 10}}>
    <TouchableOpacity onPress={() => toggleExpand(ovetTimeIndex)}>
      <View style={styles.titleWrapper}>
        <View>
          <Text style={styles.logDateTitleStyle}>Project Name</Text>
          <Text style={styles.logValueStyle}>{item.project_name}</Text>
        </View>
        <View>
          <Text style={styles.logDateTitleStyle}>Task title</Text>
          <Text style={styles.logValueStyle}>{item.task_title}</Text>
        </View>
        <Icon
          name={
            expanded.includes(ovetTimeIndex) ? 'chevron-up' : 'chevron-down'
          }
          size={32}
          color="#333"
        />
      </View>
    </TouchableOpacity>
    {expanded.includes(ovetTimeIndex) && (
      <View style={styles.details}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <View style={styles.sectionViewStyle}>
            <Text style={styles.sectionTitleStyle}>Date</Text>
            <Text style={styles.logValueStyle}>
              {moment(item?.tracked_date).format('DD/MM/YYYY')}
            </Text>
          </View>
          <View style={styles.sectionViewStyle}>
            <Text style={styles.sectionTitleStyle}>Start time</Text>
            <Text style={styles.logValueStyle}>
              {moment(item?.start_time).format('hh:mm a')}
            </Text>
          </View>
          <View style={styles.sectionViewStyle}>
            <Text style={styles.sectionTitleStyle}>End date</Text>
            <Text style={styles.logValueStyle}>
              {moment(item?.end_time).format('hh:mm a')}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            marginTop: 15,
          }}>
          <View style={styles.sectionViewStyle}>
            <Text style={styles.sectionTitleStyle}>Total Duration</Text>
            <Text style={styles.logValueStyle}>
              {item?.total_duration} Hour
            </Text>
          </View>
          <View style={styles.sectionViewStyle}>
            <Text style={styles.sectionTitleStyle}>Is Paid</Text>
            <Text style={styles.logValueStyle}>
              {item?.is_paid === 0 ? 'NO' : 'YES'}
            </Text>
          </View>
          <View style={styles.sectionViewStyle}>
            <Text style={styles.sectionTitleStyle}>Status</Text>
            <Text style={styles.logValueStyle}>{item?.status}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            marginTop: 15,
          }}>
          <View style={styles.sectionViewStyle}>
            <Text style={styles.sectionTitleStyle}>Note</Text>
            <Text style={styles.logValueStyle}>{item?.note}</Text>
          </View>
        </View>
      </View>
    )}
  </View>
)

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
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logTextStyle: {
    fontWeight: '700',
    textTransform: 'capitalize',
    color: 'white',
  },
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
  extraHourTextStyle: {
    backgroundColor: Config.accentColor,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 10,
  },
  formInputTitle: {
    fontWeight: 'bold',
    color: '#b6c0cb',
    fontSize: 16,
  },
  projectViewStyle: {
    paddingHorizontal: 15,
  },
  formInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  loaderViewStyle: {
    marginTop: 50,
    justifyContent: 'center',
  },
  noDataFound: {
    height: 50,
    width: 50,
  },
  noExtraLog: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noExtraLogText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
})
