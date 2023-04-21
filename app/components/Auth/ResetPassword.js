import React, {Component} from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import {Config} from '../../common'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {CustomTextInput} from '..'
import {connect} from 'react-redux'
import {resetPassword} from './AuthActions'

const {width, height} = Dimensions.get('window')

class ResetPassword extends Component {
  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      backgroundColor: 'transparent',
      color: '#ffffff',
    },
    headerTransparent: {
      position: 'absolute',
    },
    headerTintColor: '#ffffff',
  })

  constructor(props) {
    super(props)
  }

  render() {
    const {navigation, state} = this.props
    const ResetSchema = Yup.object().shape({
      password: Yup.string().required('Password is required.'),
      password_confirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password does not match.')
        .required('Passowrd Confirmation is required.'),
    })
    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.resetWrapper}>
          <View style={styles.resetContainer}>
            <View style={styles.reset}>
              <Text style={styles.resetHeading}>Reset Password</Text>
            </View>
          </View>
        </View>
        <Formik
          initialValues={{password: '', password_confirm: ''}}
          validationSchema={ResetSchema}
          onSubmit={async (values, actions) => {
            const passwords = {
              password: values.password,
              confirm_password: values.password_confirm,
              token: navigation.state.params.token,
            }
            await this.props.resetPassword(passwords, navigation)
          }}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View style={styles.resetForm}>
              <Text style={styles.formInputTitle}>New Password</Text>
              <CustomTextInput
                placeholderTextColor="#b6c0cb"
                placeholder="New Password"
                secureTextEntry={true}
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
                value={values.password}
                error={errors.password}
              />
              <Text style={styles.formInputTitle}>Confirm Password</Text>
              <CustomTextInput
                placeholderTextColor="#b6c0cb"
                placeholder="Confirm Password"
                secureTextEntry={true}
                onBlur={handleBlur('password_confirm')}
                onChangeText={handleChange('password_confirm')}
                value={values.password_confirm}
                error={errors.password_confirm}
              />
              <TouchableOpacity style={styles.resetBtn} onPress={handleSubmit}>
                {state.resetPassword.loading ? (
                  <ActivityIndicator size="large" color="#fff" />
                ) : (
                  <Text style={styles.resetText}>Confirm</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  resetWrapper: {
    flex: 0,
    height: height / 2.5,
    overflow: 'hidden',
  },
  resetContainer: {
    borderRadius: width,
    width: width * 2,
    height: width * 2,
    marginLeft: -(width / 2),
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
    backgroundColor: Config.primayColor,
  },
  reset: {
    height: height / 2.5,
    width: width,
    position: 'absolute',
    bottom: 0,
    marginLeft: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetHeading: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#ffffff',
  },
  resetForm: {
    marginVertical: 20,
    marginHorizontal: 25,
  },
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
  resetBtn: {
    backgroundColor: Config.primaryDark,
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  resetText: {
    textAlign: 'center',
    fontSize: 22,
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
    state: state.AuthReducers,
  }
}

export default connect(mapStateToProps, {resetPassword})(ResetPassword)
