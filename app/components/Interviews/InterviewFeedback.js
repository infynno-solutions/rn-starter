import React, {Component} from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import CustomHeader from '../CustomHeader'
import {Formik} from 'formik'
import CustomTextInput from '../CustomTextInput'
import {Config} from '../../common'
import {Picker} from '@react-native-picker/picker'
import {connect} from 'react-redux'
import {updateFeedback} from './InterviewActions'
import * as Yup from 'yup'

const feedbackStatus = [
  {
    id: 'Pass',
    value: 'Pass',
  },
  {
    id: 'Fail',
    value: 'Fail',
  },
]

class InterviewFeedback extends Component {
  static navigationOptions = () => ({
    header: null,
  })

  render() {
    const {navigation, state} = this.props
    const {interviewId, status, feedback} = this.props.navigation.state.params

    const feedbackSchema = Yup.object().shape({
      status: Yup.string().required('Status is Reuired'),
      feedback: Yup.string().required('Feedback is Required.'),
    })

    return (
      <View style={styles.appContainer}>
        <CustomHeader name="Interview Feedback" navigation={navigation} />
        <ScrollView>
          <Formik
            initialValues={{feedback, status}}
            validationSchema={feedbackSchema}
            onSubmit={async values => {
              const feedbackData = {
                interview_id: interviewId,
                status: values.status,
                feedback: values.feedback,
              }
              await this.props.updateFeedback(feedbackData, navigation)
            }}>
            {({
              values,
              handleSubmit,
              handleBlur,
              errors,
              handleChange,
              setFieldValue,
            }) => (
              <View style={styles.feedbackForm}>
                <Text style={styles.inputTitle}>Request To</Text>
                <Picker
                  selectedValue={values.status}
                  onValueChange={(itemValue, itemIndex) =>
                    setFieldValue('status', itemValue)
                  }
                  error={errors.status}>
                  {feedbackStatus.map(feedbackOption => (
                    <Picker.Item
                      key={feedbackOption.id}
                      label={feedbackOption.value}
                      value={feedbackOption.id}
                    />
                  ))}
                </Picker>
                <Text style={styles.inputTitle}>Feedback</Text>
                <CustomTextInput
                  placeholderTextColor="#b6c0cb"
                  placeholder="Feedback"
                  onBlur={handleBlur('feedback')}
                  onChangeText={handleChange('feedback')}
                  error={errors.feedback}
                  value={values.feedback}
                />
                <TouchableOpacity
                  disabled={state.updateFeedback.loading}
                  style={styles.submitBtn}
                  onPress={handleSubmit}>
                  {state.updateFeedback.loading ? (
                    <ActivityIndicator size="large" color="#fff" />
                  ) : (
                    <Text style={styles.submitText}>Update</Text>
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
  feedbackForm: {
    margin: 20,
  },
  inputTitle: {
    fontWeight: 'bold',
    color: '#666',
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
    state: state.InterviewReducers,
  }
}

export default connect(mapStateToProps, {
  updateFeedback,
})(InterviewFeedback)
