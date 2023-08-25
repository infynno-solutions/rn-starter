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
  addExtraLog,
  extraRequestUser,
  fetchProjectsTasks,
  fetchWorkLogs,
  getExtraLogsList,
} from '../Projects/ProjectsActions'

import {Formik} from 'formik'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'
import {Picker} from '@react-native-picker/picker'
import CustomTextInput from '../CustomTextInput'
import FormatDate from '../FormatDate'
import appStyle from '../../common/appStyle'
import {AddExtraLogSchema} from '../../common/validationSchema'

const OverTimeBottomSheet = ({
  navigation,
  isVisible,
  setIsVisible,
  setFilter,
}) => {
  let sheetRef = useRef(null)

  const [isDatePickerShow, setIsDatePickerShow] = useState({
    start_date: false,
    start_time: false,
    end_time: false,
  })
  const [height, setHeight] = useState(200)

  const dispatch = useDispatch()

  const {
    worklogs,
    projectTasks,
    isStoreLoading,
    isLoading,
    worklogsTaskLoading,
    requestUser,
  } = useSelector((state) => state.ProjectsReducers)

  useEffect(() => {
    dispatch(fetchWorkLogs(navigation))
    dispatch(extraRequestUser(navigation))
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
            initialValues={{
              project_id: Number(0),
              task_id: Number(0),
              tracked_date: '',
              note: '',
              start_time: '',
              end_time: '',
              request_to: Number(0),
            }}
            validationSchema={AddExtraLogSchema}
            onSubmit={async (values) => {
              const payload = {
                ...values,
                tracked_date: moment(values.tracked_date).format('YYYY-MM-DD'),
              }
              dispatch(addExtraLog(payload))
                .then(() => {
                  setIsVisible()
                  const params = {
                    date_range: `${moment()
                      .startOf('month')
                      .format('YYYY-MM-DD')},${moment()
                      .endOf('month')
                      .format('YYYY-MM-DD')}`,
                  }
                  dispatch(getExtraLogsList(navigation, params)).then(() => {
                    setFilter({
                      projectId: 0,
                      start_date: moment()
                        .startOf('month')
                        .format('YYYY-MM-DD'),
                      end_date: moment().endOf('month').format('YYYY-MM-DD'),
                    })
                  })
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
                        <Text style={styles.headTextStyle}>
                          Add Extra Hours
                        </Text>
                        <TouchableOpacity onPress={setIsVisible}>
                          <Icon name="close" size={24} color="#333" />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.bottomLineStyle} />
                      <View style={styles.bottomContentStyle}>
                        <Text style={styles.formInputTitle}>Projects</Text>
                        {isLoading ? (
                          <View style={{height: 50}}>
                            <ActivityIndicator size="small" />
                          </View>
                        ) : (
                          <Picker
                            selectedValue={values.project_id}
                            enabled
                            onValueChange={(itemValue, itemIndex) => {
                              if (itemIndex > 0) {
                                setFieldValue('project_id', itemValue)
                                dispatch(
                                  fetchProjectsTasks(itemValue, navigation)
                                )
                              }
                            }}>
                            <Picker.Item
                              label={'Select Project'}
                              value={Number(0)}
                              style={{color: '#80808066'}}
                            />
                            {worklogs?.userProjects.map((project) => {
                              return (
                                <Picker.Item
                                  key={project.id}
                                  label={project.name}
                                  value={Number(project.id)}
                                  style={
                                    values.project_id === project.id
                                      ? {
                                          color: '#000000',
                                        }
                                      : {color: '#000000B3'}
                                  }
                                />
                              )
                            })}
                          </Picker>
                        )}
                        <View style={{marginBottom: 15}}>
                          <View style={[styles.formInput, {marginBottom: 0}]} />
                          {errors.project_id && touched.project_id && (
                            <Text style={{color: 'red'}}>
                              {errors.project_id}
                            </Text>
                          )}
                        </View>
                        <Text style={styles.formInputTitle}>Task</Text>
                        {worklogsTaskLoading ? (
                          <View style={{height: 50}}>
                            <ActivityIndicator size="small" />
                          </View>
                        ) : (
                          <>
                            <Picker
                              selectedValue={Number(values.task_id)}
                              placeholder={'Select Task'}
                              onValueChange={(itemValue, itemIndex) => {
                                if (itemIndex > 0) {
                                  setFieldValue('task_id', itemValue)
                                }
                              }}>
                              <Picker.Item
                                label={'Select Task'}
                                value={Number(0)}
                                style={{color: '#80808066'}}
                              />
                              {projectTasks?.map?.((project) => {
                                return (
                                  <Picker.Item
                                    key={Number(project.id)}
                                    label={project.title}
                                    value={Number(project.id)}
                                    style={
                                      values.task_id === project.id
                                        ? {
                                            color: '#000000',
                                          }
                                        : {color: '#000000B3'}
                                    }
                                  />
                                )
                              })}
                            </Picker>
                            <View style={{marginBottom: 15}}>
                              <View
                                style={[styles.formInput, {marginBottom: 0}]}
                              />
                              {errors.task_id && touched.task_id && (
                                <Text style={{color: 'red'}}>
                                  {errors.task_id}
                                </Text>
                              )}
                            </View>
                          </>
                        )}
                        <View style={{marginBottom: 10}}>
                          <Text style={styles.formInputTitle}>Start Date</Text>
                          <TouchableOpacity
                            onPress={() =>
                              setIsDatePickerShow({
                                ...isDatePickerShow,
                                start_date: true,
                              })
                            }>
                            <CustomTextInput
                              editable={false}
                              placeholderTextColor="#000"
                              placeholder="Select date"
                              value={
                                values.tracked_date
                                  ? FormatDate(values.tracked_date)
                                  : ''
                              }
                              style={styles.dateTextStyle}
                            />
                            {errors.tracked_date && touched.tracked_date && (
                              <Text style={styles.errorStyle}>
                                {errors.tracked_date}
                              </Text>
                            )}
                          </TouchableOpacity>
                        </View>

                        {isDatePickerShow.start_date && (
                          <DateTimePicker
                            value={values.tracked_date || new Date()}
                            mode="date"
                            maximumDate={new Date()}
                            display="calendar"
                            onChange={(event, date) => {
                              if (event.type !== 'dismissed') {
                                setIsDatePickerShow({
                                  ...isDatePickerShow,
                                  start_date: false,
                                })
                                setFieldValue('tracked_date', date)
                              } else {
                                setIsDatePickerShow({
                                  ...isDatePickerShow,
                                  start_date: false,
                                })
                              }
                            }}
                          />
                        )}
                        <View style={styles.timeViewStyle}>
                          <View style={styles.pickerStyle}>
                            <Text style={styles.formInputTitle}>
                              Start time
                            </Text>
                            <TouchableOpacity
                              onPress={() =>
                                setIsDatePickerShow({
                                  ...isDatePickerShow,
                                  start_time: true,
                                })
                              }>
                              <CustomTextInput
                                editable={false}
                                placeholderTextColor="#000"
                                placeholder="00:00"
                                value={
                                  values.start_time
                                    ? moment(values.start_time, 'HH:mm').format(
                                        'hh:mm a'
                                      )
                                    : ''
                                }
                                style={styles.dateTextStyle}
                              />
                              {errors.start_time && touched.start_time && (
                                <Text
                                  style={[styles.errorStyle, {fontSize: 12}]}>
                                  {errors.start_time}
                                </Text>
                              )}
                            </TouchableOpacity>

                            {isDatePickerShow.start_time && (
                              <DateTimePicker
                                value={new Date()}
                                mode="time"
                                onChange={(event, date) => {
                                  if (event.type !== 'dismissed') {
                                    setIsDatePickerShow({
                                      ...isDatePickerShow,
                                      start_time: false,
                                    })
                                    setFieldValue(
                                      'start_time',
                                      moment(date).format('HH:mm')
                                    )
                                  } else {
                                    setIsDatePickerShow({
                                      ...isDatePickerShow,
                                      start_time: false,
                                    })
                                  }
                                }}
                              />
                            )}
                          </View>
                          <View style={styles.pickerStyle}>
                            <Text style={styles.formInputTitle}>End time</Text>
                            <TouchableOpacity
                              onPress={() =>
                                setIsDatePickerShow({
                                  ...isDatePickerShow,
                                  end_time: true,
                                })
                              }>
                              <CustomTextInput
                                editable={false}
                                placeholderTextColor="#000"
                                placeholder="00:00"
                                value={
                                  values.end_time
                                    ? moment(values.end_time, 'HH:mm').format(
                                        'hh:mm a'
                                      )
                                    : ''
                                }
                                style={styles.dateTextStyle}
                              />
                              {errors.end_time && touched.end_time && (
                                <Text
                                  style={[styles.errorStyle, {fontSize: 12}]}>
                                  {errors.end_time}
                                </Text>
                              )}
                            </TouchableOpacity>

                            {isDatePickerShow.end_time && (
                              <DateTimePicker
                                value={new Date()}
                                mode="time"
                                onChange={(event, date) => {
                                  if (event.type !== 'dismissed') {
                                    setIsDatePickerShow({
                                      ...isDatePickerShow,
                                      end_time: false,
                                    })
                                    setFieldValue(
                                      'end_time',
                                      moment(date).format('HH:mm')
                                    )
                                  } else {
                                    setIsDatePickerShow({
                                      ...isDatePickerShow,
                                      end_time: false,
                                    })
                                  }
                                }}
                              />
                            )}
                          </View>
                        </View>
                        <Text style={[styles.formInputTitle, {marginTop: 10}]}>
                          Request To:
                        </Text>
                        <>
                          <Picker
                            selectedValue={Number(values.request_to)}
                            placeholder={'Select Task'}
                            mode="dropdown"
                            onValueChange={(itemValue, itemIndex) => {
                              if (itemIndex > 0) {
                                setFieldValue('request_to', itemValue)
                              }
                            }}>
                            <Picker.Item
                              label={'Select User'}
                              value={Number(0)}
                              style={{color: '#80808066'}}
                            />
                            {requestUser?.map((user) => {
                              return (
                                <Picker.Item
                                  key={Number(user.id)}
                                  label={user.full_name}
                                  value={Number(user.id)}
                                  style={
                                    values.request_to === user.id
                                      ? {
                                          color: '#000000',
                                        }
                                      : {color: '#000000B3'}
                                  }
                                />
                              )
                            })}
                          </Picker>
                          <View style={{marginBottom: 15}}>
                            <View
                              style={[styles.formInput, {marginBottom: 0}]}
                            />
                            {errors.request_to && touched.request_to && (
                              <Text style={{color: 'red'}}>
                                {errors.request_to}
                              </Text>
                            )}
                          </View>
                        </>
                        <Text style={[styles.formInputTitle, {marginTop: 10}]}>
                          Note
                        </Text>
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
                      </View>
                    </View>
                    <View style={styles.buttonViewStyle}>
                      <TouchableOpacity
                        disabled={isLoading || worklogsTaskLoading}
                        testID={'saveButton'}
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
                        testID={'cancelButton'}
                        style={{
                          ...styles.btnStyle,
                          ...styles.submitButtonStyle,
                        }}
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
export default OverTimeBottomSheet

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
  errorStyle: {color: 'red', marginTop: -15},
  bottomContentStyle: {paddingHorizontal: 35, paddingVertical: 10},
  submitButtonStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
  },
})
