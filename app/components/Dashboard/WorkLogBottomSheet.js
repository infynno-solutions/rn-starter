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
import {Config} from '../../common'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {useDispatch, useSelector} from 'react-redux'
import {
  addWorklogStore,
  fetchWorkLogProjects,
  fetchWorkLogs,
} from '../Projects/ProjectsActions'
import * as Yup from 'yup'
import {Formik} from 'formik'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'
import {Picker} from '@react-native-picker/picker'
import CustomTextInput from '../CustomTextInput'
import FormatDate from '../FormatDate'
import {HoursData, MinutesData} from '../../utills/constant'

const AddWorkLogSchema = Yup.object().shape({
  project_id: Yup.number().required('Project field is required').nullable(),
  task_id: Yup.number().required('Task field is required').nullable(),
  tracked_date: Yup.string().required('Date field is required'),
  note: Yup.string().required('Please provide the note'),
  hours: Yup.number().required('Hours field is required'),
  minutes: Yup.number().required('Minutes field is required'),
})

const WorkLogBottomSheet = ({navigation, isVisible, setIsVisible}) => {
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
            initialValues={{
              project_id: worklogs?.latestTrackerProject?.projectId ?? null,
              task_id: worklogs?.latestTrackerTask?.tasksId ?? null,
              tracked_date: moment(),
              note: '',
              hours: 8,
              minutes: 0,
            }}
            validationSchema={AddWorkLogSchema}
            onSubmit={async (values) => {
              const payload = {
                ...values,
                tracked_date: moment(values.tracked_date).format('DD-MM-YYYY'),
              }
              dispatch(addWorklogStore(payload))
                .then((res) => {
                  setIsVisible()
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
                        <Text style={styles.formInputTitle}>Date of Birth</Text>
                        <TouchableOpacity
                          onPress={() => setIsDatePickerShow(true)}>
                          <CustomTextInput
                            editable={false}
                            placeholderTextColor="#000"
                            placeholder="Date of Birth"
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
  formInputTitle: {
    fontWeight: 'bold',
    color: '#b6c0cb',
    fontSize: 16,
  },
  formInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    marginBottom: 15,
    fontWeight: 'bold',
  },
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
  btnStyle: {
    backgroundColor: Config.primaryDark,
    borderRadius: 10,
    width: 160,
    paddingVertical: 13,
    paddingHorizontal: 16,
    marginTop: 30,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    shadowOffset: {width: 5, height: 3},
    shadowColor: 'red',
    shadowOpacity: 0.5,
    elevation: 5,
  },
  loaderViewStyle: {
    height: '100%',
    justifyContent: 'center',
  },
  buttonViewStyle: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    position: 'relative',
    bottom: 15,
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
  errorTextStyle: {
    color: 'red',
    marginTop: 5,
    marginLeft: 5,
  },
  dateTextStyle: {
    marginLeft: 10,
    color: 'black',
    fontWeight: '400',
  },
  bottomLineStyle: {
    borderBottomWidth: 2,
    borderBottomColor: '#e9ecef',
    paddingHorizontal: 10,
    width: '100%',
    paddingVertical: 10,
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
