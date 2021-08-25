import React, {Component} from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import {Config} from '../../common'
import {Formik} from 'formik'
import * as Yup from 'yup'
import CustomTextInput from '../CustomTextInput'
import {connect} from 'react-redux'
import {forgotPassword} from './AuthActions'
const {width, height} = Dimensions.get('window')

class Forgot extends Component {
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
    const ForgotSchema = Yup.object().shape({
      email: Yup.string()
        .email('Invalid Email')
        .required('Email ID is required.'),
    })
    return (
      <ScrollView testID={'forgotScreen'} style={styles.mainContainer}>
        <View style={styles.forgotWrapper}>
          <View style={styles.forgotContainer}>
            <View style={styles.forgot}>
              <Text style={styles.forgotHeading}>Forgot Password</Text>
            </View>
          </View>
        </View>
        <Formik
          initialValues={{email: ''}}
          validationSchema={ForgotSchema}
          onSubmit={async (values, actions) => {
            const email = {email: values.email}
            this.props.forgotPassword(email, navigation)
          }}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View style={styles.forgotForm}>
              <Text style={styles.formInputTitle}>Email</Text>
              <CustomTextInput
                placeholderTextColor="#b6c0cb"
                placeholder="eg. abc@xyz.com"
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                value={values.email}
                error={errors.email}
                testID={'email'}
              />
              <TouchableOpacity
                testID={'forgotButton'}
                style={styles.forgotBtn}
                onPress={handleSubmit}>
                {state.forgotPassword.loading ? (
                  <ActivityIndicator size="large" color="#fff" />
                ) : (
                  <Text style={styles.forgotText}>Submit</Text>
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
  forgotWrapper: {
    flex: 0,
    height: height / 2.5,
    overflow: 'hidden',
  },
  forgotContainer: {
    borderRadius: width,
    width: width * 2,
    height: width * 2,
    marginLeft: -(width / 2),
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
    backgroundColor: Config.primayColor,
  },
  forgot: {
    height: height / 2.5,
    width: width,
    position: 'absolute',
    bottom: 0,
    marginLeft: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotHeading: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#ffffff',
  },
  forgotForm: {
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
  forgotBtn: {
    backgroundColor: Config.primaryDark,
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  forgotText: {
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

const mapStateToProps = state => {
  return {
    state: state.AuthReducers,
  }
}
export default connect(mapStateToProps, {forgotPassword})(Forgot)
