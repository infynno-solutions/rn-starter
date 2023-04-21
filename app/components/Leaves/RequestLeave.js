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
import CustomInput from '../CustomInput'
import CustomTextInput from '../CustomTextInput'
import {connect} from 'react-redux'
import {addLeave, requestTo} from './LeavesActions'
import FormatDate from '../FormatDate'
import {Picker} from '@react-native-picker/picker'

class RequestLeave extends Component {
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
    this.requestTo()
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

    return (
      <View style={styles.appContainer}>
        <CustomHeader name="Request Leave" navigation={navigation} />
        <ScrollView>
          <Formik
            initialValues={{
              startDate: '',
              endDate: '',
              type: 1,
              firstSecond: 1,
              emgContact: '',
              reason: '',
              request_to: 1,
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

              await this.props.addLeave(leave, navigation)
            }}>
            {({
              handleSubmit,
              handleBlur,
              errors,
              handleChange,
              setFieldValue,
              values,
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
                    this.setState((prevState) => ({
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
                      dayComponent={(props) => {
                        return (
                          <CustomDay {...props} startDate={values.startDate} />
                        )
                      }}
                      onDayPress={(day) => {
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
                    this.setState((prevState) => ({
                      endModalVisible: !prevState.endModalVisible,
                    }))
                  }
                  error={errors.endDate}
                />
                {this.state.endModalVisible && (
                  <View style={styles.pickerModal}>
                    <Calendar
                      dayComponent={(props) => {
                        return <CustomDay {...props} endDate={values.endDate} />
                      }}
                      onDayPress={(day) => {
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
                  initial={0}
                  formHorizontal={true}
                  labelHorizontal={true}
                  onPress={(value) => {
                    setFieldValue('type', value)
                    this.setState({
                      type: value,
                      halfVisible: value === '2' ? true : false,
                    })
                  }}
                />
                {this.state.halfVisible && (
                  <View>
                    <Text style={styles.inputTitle}>First/Second Half</Text>
                    <RadioForm
                      style={styles.radioButtons}
                      radio_props={half_props}
                      formHorizontal={true}
                      labelHorizontal={true}
                      onPress={(value) => {
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
                    state.requestTo.data.users.map((user) => (
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
                />
                <Text style={styles.inputTitle}>Reason</Text>
                <CustomTextInput
                  placeholderTextColor="#b6c0cb"
                  placeholder="Reason for leave"
                  onBlur={handleBlur('reason')}
                  onChangeText={handleChange('reason')}
                  error={errors.reason}
                />
                <TouchableOpacity
                  disabled={state.addLeaves.loading}
                  style={styles.submitBtn}
                  onPress={handleSubmit}>
                  {state.addLeaves && state.addLeaves.loading ? (
                    <ActivityIndicator size="large" color="#fff" />
                  ) : (
                    <Text style={styles.submitText}>Submit</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </Formik>
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

const mapStateToProps = (state) => {
  return {
    state: state.LeavesReducers,
  }
}

export default connect(mapStateToProps, {addLeave, requestTo})(RequestLeave)
