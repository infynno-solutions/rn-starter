import React, {Component} from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import {Calendar} from 'react-native-calendars'
import RadioForm from 'react-native-simple-radio-button'
import CustomHeader from '../CustomHeader'
import CustomDay from '../CustomDay'
import {Config} from '../../common'
import {Formik} from 'formik'
import * as Yup from 'yup'
import CustomTextInput from '../CustomTextInput'
import CustomInput from '../CustomInput'
import {connect} from 'react-redux'
import {getLeave, updateLeave, fetchLeaves, requestTo} from './LeavesActions'
import FormatDate from '../FormatDate'
import {Picker} from '@react-native-picker/picker'

class EditLeave extends Component {
  static navigationOptions = () => ({
    header: null,
  })

  state = {
    startModalVisible: false,
    endModalVisible: false,
    startDate: '',
    endDate: '',
    type: 1,
    halfVisible: false,
    halfType: 1,
    reason: '',
  }

  componentDidMount() {
    this.getLeave()
    this.requestTo()
  }

  getLeave = async () => {
    const leave_id = this.props.navigation.state.params.leaveId
    await this.props.getLeave(leave_id)
  }

  requestTo = async () => {
    const {navigation} = this.props
    await this.props.requestTo(navigation)
  }

  render() {
    const {navigation, state} = this.props
    const radio_props = [
      {label: 'Full Day  ', value: '1'},
      {label: 'Half Day', value: '2'},
    ]
    const half_props = [
      {label: 'First Half  ', value: '1'},
      {label: 'Second Half', value: '2'},
    ]

    const leaveSchema = Yup.object().shape({
      startDate: Yup.date().required('Start Date is Reuired'),
      endDate: Yup.date().required('End Date is Required.'),
      emgContact: Yup.string().required('Emergency Contact is Required'),
      reason: Yup.string().required('Reason is Required.'),
      request_to: Yup.number().required('Request To is Required'),
    })

    const leave_id = this.props.navigation.state.params.leaveId

    return (
      <View style={styles.appContainer}>
        <CustomHeader name="Edit Leave" navigation={navigation} />
        <ScrollView>
          {state.getLeave.loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <>
              {state.getLeave.data.leave && (
                <Formik
                  initialValues={{
                    startDate: state.getLeave.data.leave.start_date,
                    endDate: state.getLeave.data.leave.end_date,
                    type: state.getLeave.data.leave.type,
                    firstSecond:
                      state.getLeave.data.leave.half_day == null
                        ? 1
                        : state.getLeave.data.leave.half_day,
                    reason: state.getLeave.data.leave.reason,
                    emgContact: state.getLeave.data.leave.emg_contact_no,
                    request_to: state.getLeave.data.leave.request_to,
                  }}
                  validationSchema={leaveSchema}
                  onSubmit={async (values, actions) => {
                    const leave = {
                      start_date: values.startDate,
                      end_date: values.endDate,
                      leave_type: values.type,
                      half_day: values.type === 1 ? null : values.firstSecond,
                      reason: values.reason,
                      emg_contact_no: values.emgContact,
                      request_to: values.request_to,
                    }
                    await this.props.updateLeave(leave_id, leave, navigation)
                  }}>
                  {({
                    values,
                    handleSubmit,
                    handleBlur,
                    errors,
                    handleChange,
                    setFieldValue,
                  }) => (
                    <View style={styles.leaveForm}>
                      <Text style={styles.inputTitle}>Start Date</Text>
                      <CustomInput
                        text={
                          values.startDate === ''
                            ? 'DD-MM-YYYY'
                            : FormatDate(values.startDate)
                        }
                        onPress={() =>
                          this.setState(prevState => ({
                            startModalVisible: !prevState.startModalVisible,
                          }))
                        }
                        error={errors.startDate}
                      />
                      {this.state.startModalVisible && (
                        <View style={styles.pickerModal}>
                          <Calendar
                            name="startDate"
                            markingType={'period'}
                            dayComponent={props => {
                              return <CustomDay {...props} />
                            }}
                            onDayPress={day => {
                              setFieldValue('startDate', day.dateString)
                              this.setState({
                                startDate: day.dateString,
                                startModalVisible: false,
                              })
                            }}
                            firstDay={1}
                            hideExtraDays={true}
                            markedDates={{}}
                          />
                        </View>
                      )}

                      <Text style={styles.inputTitle}>End Date</Text>
                      <CustomInput
                        text={
                          values.endDate === ''
                            ? 'DD-MM-YYYY'
                            : FormatDate(values.endDate)
                        }
                        onPress={() =>
                          this.setState(prevState => ({
                            endModalVisible: !prevState.endModalVisible,
                          }))
                        }
                        error={errors.endDate}
                      />
                      {this.state.endModalVisible && (
                        <View style={styles.pickerModal}>
                          <Calendar
                            dayComponent={props => {
                              return <CustomDay {...props} />
                            }}
                            onDayPress={day => {
                              setFieldValue('endDate', day.dateString)
                              this.setState({
                                endDate: day.dateString,
                                endModalVisible: false,
                              })
                            }}
                            firstDay={1}
                            hideExtraDays={true}
                            markedDates={{}}
                          />
                        </View>
                      )}
                      <Text style={styles.inputTitle}>Type</Text>
                      <RadioForm
                        style={styles.radioButtons}
                        radio_props={radio_props}
                        initial={values.type === 1 ? 0 : 1}
                        formHorizontal={true}
                        labelHorizontal={true}
                        onPress={value => {
                          setFieldValue('type', value)
                          this.setState({
                            type: value,
                            halfVisible: value === '2' ? true : false,
                          })
                        }}
                      />
                      {(this.state.halfVisible || values.type === 2) && (
                        <View>
                          <Text style={styles.inputTitle}>
                            First/Second Half
                          </Text>
                          <RadioForm
                            style={styles.radioButtons}
                            radio_props={half_props}
                            initial={values.firstSecond}
                            formHorizontal={true}
                            labelHorizontal={true}
                            onPress={value => {
                              setFieldValue('firstSecond', value)
                              this.setState({halfType: value})
                            }}
                          />
                        </View>
                      )}
                      <Text style={styles.inputTitle}>Request To</Text>
                      <Picker
                        selectedValue={values.request_to}
                        onValueChange={(itemValue, itemIndex) =>
                          setFieldValue('request_to', itemValue)
                        }
                        error={errors.requestTo}>
                        {state.requestTo.data &&
                          state.requestTo.data.users &&
                          state.requestTo.data.users.map(user => (
                            <Picker.Item
                              key={user.id}
                              label={user.full_name}
                              value={user.id}
                            />
                          ))}
                      </Picker>
                      <Text style={styles.inputTitle}>Emergency Contact</Text>
                      <CustomTextInput
                        placeholderTextColor="#b6c0cb"
                        placeholder="Contact No"
                        keyboardType="number-pad"
                        onBlur={handleBlur('emgContact')}
                        onChangeText={handleChange('emgContact')}
                        error={errors.emgContact}
                        value={values.emgContact}
                      />
                      <Text style={styles.inputTitle}>Reason</Text>
                      <CustomTextInput
                        placeholderTextColor="#b6c0cb"
                        placeholder="Reason for leave"
                        onBlur={handleBlur('reason')}
                        onChangeText={handleChange('reason')}
                        error={errors.reason}
                        value={values.reason}
                      />

                      <TouchableOpacity
                        disabled={state.updateLeave.loading}
                        style={styles.submitBtn}
                        onPress={handleSubmit}>
                        {state.updateLeave.loading ? (
                          <ActivityIndicator size="large" color="#fff" />
                        ) : (
                          <Text style={styles.submitText}>Update</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                </Formik>
              )}
            </>
          )}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  leaveForm: {
    margin: 20,
  },
  inputTitle: {
    fontWeight: 'bold',
    color: '#666',
  },
  pickerModal: {
    elevation: 5,
  },
  datePicker: {
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginVertical: 8,
  },
  radioButtons: {
    marginVertical: 8,
  },
  reason: {
    backgroundColor: '#eee',
    borderRadius: 5,
    marginVertical: 8,
    padding: 15,
  },
  submitBtn: {
    backgroundColor: Config.primaryDark,
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  submitText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    shadowOffset: {width: 5, height: 3},
    shadowColor: 'red',
    shadowOpacity: 0.5,
    elevation: 5,
  },
})

const mapStateToProps = state => {
  return {
    state: state.LeavesReducers,
  }
}

export default connect(mapStateToProps, {
  getLeave,
  updateLeave,
  fetchLeaves,
  requestTo,
})(EditLeave)
