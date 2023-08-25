import React, {useEffect, useRef, useState} from 'react'
import RBSheet from 'react-native-raw-bottom-sheet'
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {useDispatch, useSelector} from 'react-redux'
import {
  addWorklogStore,
  fetchWorkLogProjects,
  fetchWorkLogs,
} from '../Projects/ProjectsActions'
import {Formik} from 'formik'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'
import {Picker} from '@react-native-picker/picker'
import CustomTextInput from '../CustomTextInput'
import FormatDate from '../FormatDate'
import {HoursData, MinutesData} from '../../utills/constant'
import {AddWorkLogSchema} from '../../common/validationSchema'
import appStyle from '../../common/appStyle'
import {fetchStats} from './DashboardActions'

const WorkLogBottomSheet = ({
  navigation,
  isVisible,
  initialValues,
  setIsVisible,
}) => {
  let sheetRef = useRef(null)

  const [isDatePickerShow, setIsDatePickerShow] = useState(false)
  const [height, setHeight] = useState(200)

  const dispatch = useDispatch()

  const {
    worklogs,
    worklogsProject,
    isStoreLoading,
    isLoading,
    worklogsTaskLoading,
  } = useSelector((state) => state.ProjectsReducers)

  useEffect(() => {
    dispatch(fetchWorkLogs(navigation)).then((data) => {
      dispatch(
        fetchWorkLogProjects(data?.latestTrackerProject?.projectId, navigation)
      )
    })
  }, [dispatch, navigation])

  useEffect(() => {
    if (isVisible) {
      sheetRef.open()
    }
  }, [isVisible])

  return (
    <>
      <RBSheet
        ref={(ref) => {
          sheetRef = ref
        }}
        height={Dimensions.get('screen').height - 250}
        customStyles={{
          wrapper: {paddingHorizontal: 4},
          container: {borderRadius: 10},
        }}
        onClose={setIsVisible}>
        <SafeAreaView>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={AddWorkLogSchema}
            onSubmit={async (values) => {
              const payload = {
                ...values,
                tracked_date: moment(values.tracked_date).format('DD-MM-YYYY'),
              }
              dispatch(addWorklogStore(payload))
                .then((res) => {
                  setIsVisible()
                  dispatch(
                    fetchStats(navigation, {
                      start_date: moment()
                        .startOf('isoWeek')
                        .format('DD-MM-YYYY'),
                      end_date: moment().endOf('isoWeek').format('DD-MM-YYYY'),
                    })
                  )
                })
                .catch((error) => {
                  console.log('error', error)
                })
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
              setFieldValue,
            }) => (
              <View>
                {isLoading ? (
                  <View style={styles.loaderViewStyle}>
                    <ActivityIndicator size="large" />
                  </View>
                ) : (
                  <ScrollView
                    contentContainerStyle={{flexGrow: 1}}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.headerView}>
                      <View style={styles.headViewStyle}>
                        <Text style={styles.headTextStyle}>WorkLog</Text>
                        <TouchableOpacity onPress={setIsVisible}>
                          <Icon name="close" size={24} color="#333" />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.bottomLineStyle} />
                      <View
                        style={{paddingHorizontal: 35, paddingVertical: 10}}>
                        <Text style={styles.formInputTitle}>Projects</Text>
                        <Picker
                          selectedValue={values.project_id}
                          itemStyle={{
                            color: 'red',
                          }}
                          enabled
                          onValueChange={(itemValue, itemIndex) => {
                            setFieldValue('project_id', itemValue)
                            dispatch(
                              fetchWorkLogProjects(itemValue, navigation)
                            )
                          }}>
                          {worklogs?.userProjects.map((project) => {
                            return (
                              <Picker.Item
                                key={project.id}
                                label={project.name}
                                value={project.id}
                              />
                            )
                          })}
                        </Picker>
                        <View style={styles.formInput} />
                        <Text style={styles.formInputTitle}>Task</Text>
                        {worklogsTaskLoading ? (
                          <View style={{height: 50}}>
                            <ActivityIndicator size="small" />
                          </View>
                        ) : (
                          <>
                            <Picker
                              selectedValue={values.task_id}
                              placeholder={'Select Task'}
                              onValueChange={(itemValue, itemIndex) =>
                                setFieldValue('task_id', itemValue)
                              }>
                              {worklogsProject?.projectTask?.map((project) => {
                                return (
                                  <Picker.Item
                                    key={project.id}
                                    label={project.title}
                                    value={project.id}
                                  />
                                )
                              })}
                            </Picker>
                            <View style={styles.formInput} />
                          </>
                        )}
                        <Text style={styles.formInputTitle}>Date</Text>
                        <TouchableOpacity
                          onPress={() => setIsDatePickerShow(true)}>
                          <CustomTextInput
                            editable={false}
                            placeholderTextColor="#000"
                            placeholder="Date"
                            value={FormatDate(values.tracked_date)}
                            error={errors.tracked_date}
                            style={styles.dateTextStyle}
                          />
                        </TouchableOpacity>
                        {isDatePickerShow && (
                          <DateTimePicker
                            value={new Date(values.tracked_date)}
                            mode="date"
                            display="calendar"
                            maximumDate={new Date()}
                            onChange={(event, date) => {
                              if (event.type !== 'dismissed') {
                                setIsDatePickerShow(false)
                                setFieldValue('tracked_date', date)
                              } else {
                                setIsDatePickerShow(false)
                              }
                            }}
                          />
                        )}
                        <Text style={styles.formInputTitle}>Note</Text>
                        <View style={styles.note}>
                          <TextInput
                            placeholder="What you have worked?"
                            multiline={true}
                            underlineColorAndroid="transparent"
                            onBlur={handleBlur('note')}
                            onChangeText={handleChange('note')}
                            value={values.note}
                            textAlignVertical="top"
                            style={[styles.textArea, {height: height}]}
                            onContentSizeChange={(e) => {
                              if (e.nativeEvent.contentSize.height > 100) {
                                setHeight(e.nativeEvent.contentSize.height)
                              }
                            }}
                          />
                        </View>
                        {touched.note && errors.note && (
                          <Text style={styles.errorTextStyle}>
                            {errors.note}
                          </Text>
                        )}
                        <View style={styles.timeViewStyle}>
                          <View style={styles.pickerStyle}>
                            <Text style={styles.formInputTitle}>Hours</Text>
                            <View style={styles.pickerView}>
                              <Picker
                                style={styles.pickerSelectStyle}
                                placeholder={{
                                  label: 'Select State',
                                  value: '',
                                }}
                                mode="dropdown"
                                selectedValue={values.hours}
                                onValueChange={(itemValue, itemIndex) =>
                                  setFieldValue('hours', itemValue)
                                }>
                                {HoursData.map((hour, index) => {
                                  return (
                                    <Picker.Item
                                      key={index}
                                      label={hour.toString()}
                                      value={hour}
                                    />
                                  )
                                })}
                              </Picker>
                            </View>
                          </View>
                          <View style={styles.pickerStyle}>
                            <Text style={styles.formInputTitle}>Minutes</Text>
                            <View style={styles.pickerView}>
                              <Picker
                                style={styles.pickerSelectStyle}
                                mode="dropdown"
                                selectedValue={values.minutes}
                                onValueChange={(itemValue, itemIndex) =>
                                  setFieldValue('minutes', itemValue)
                                }>
                                {MinutesData.map((minute, index) => {
                                  return (
                                    <Picker.Item
                                      key={index}
                                      label={minute.toString()}
                                      value={minute}
                                    />
                                  )
                                })}
                              </Picker>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.buttonViewStyle}>
                      <TouchableOpacity
                        disabled={isLoading || worklogsTaskLoading}
                        testID={'loginButton'}
                        style={[
                          styles.btnStyle,
                          (isLoading || worklogsTaskLoading) && {
                            backgroundColor: '#006ee633',
                          },
                        ]}
                        onPress={handleSubmit}>
                        {isStoreLoading ? (
                          <ActivityIndicator size="large" color="#fff" />
                        ) : (
                          <Text style={styles.buttonText}>Save</Text>
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        testID={'loginButton'}
                        style={[
                          styles.btnStyle,
                          {backgroundColor: 'white', borderWidth: 1},
                        ]}
                        onPress={setIsVisible}>
                        <Text style={[styles.buttonText, {color: 'black'}]}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                )}
              </View>
            )}
          </Formik>
        </SafeAreaView>
      </RBSheet>
    </>
  )
}
export default WorkLogBottomSheet

const styles = StyleSheet.create({
  ...appStyle,
  note: {
    borderColor: '#b6c0cb',
    borderWidth: 1,
    padding: 5,
    marginTop: 10,
    borderRadius: 10,
  },
  textArea: {
    height: 150,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    color: 'black',
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
  pickerStyle: {width: '50%', paddingRight: 10},
  timeViewStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  dateTextStyle: {
    marginLeft: 10,
    color: 'black',
    fontWeight: '400',
  },
  headViewStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
  },
  headTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerView: {width: '100%', paddingTop: 20},
})
