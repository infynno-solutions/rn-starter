import React, {Component} from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native'
import {Config} from '../../common'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {CustomTextInput} from '..'
import {connect} from 'react-redux'
import {loginUser} from './AuthActions'
import SplashScreen from 'react-native-splash-screen'

const {width, height} = Dimensions.get('window')

class LoginScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    header: null,
  })

  componentDidMount() {
    SplashScreen.hide()
  }

  constructor(props) {
    super(props)
    this.loginSchema = Yup.object().shape({
      email: Yup.string()
        .email('Invalid Email')
        .required('Email ID is required.'),
      password: Yup.string().required('Password is Required'),
    })
  }

  render() {
    const {navigation, state} = this.props

    return (
      <ScrollView testID={'loginScreen'} style={styles.loginContainer}>
        <View style={styles.logoWrapper}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Image
                testID="logo"
                source={require('../../logo.png')}
                style={styles.logoImage}
              />
            </View>
          </View>
        </View>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={this.loginSchema}
          onSubmit={async (values) => {
            const user = {
              email: values.email,
              password: values.password,
            }
            await this.props.loginUser(user, navigation)
          }}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View style={styles.loginForm}>
              <Text style={styles.formInputTitle}>Email</Text>
              <CustomTextInput
                placeholderTextColor="#b6c0cb"
                placeholder="eg. abc@xyz.com"
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                value={values.email}
                error={errors.email}
                autoCompleteType="email"
                textContentType="emailAddress"
                testID={'email'}
              />
              <Text style={styles.formInputTitle}>Password</Text>
              <CustomTextInput
                placeholderTextColor="#b6c0cb"
                placeholder="eg. abc123"
                onBlur={handleBlur('password')}
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                error={errors.password}
                autoCompleteType="password"
                textContentType="password"
                testID={'password'}
              />
              <TouchableOpacity
                testID={'forgotLink'}
                onPress={() => navigation.navigate('Forgot')}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                testID={'loginButton'}
                style={styles.loginBtn}
                onPress={handleSubmit}>
                {state.isInprogress ? (
                  <ActivityIndicator size="large" color="#fff" />
                ) : (
                  <Text style={styles.loginText}>Login</Text>
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
  loginContainer: {
    flex: 1,
  },
  logoWrapper: {
    flex: 0,
    height: height / 2.5,
    overflow: 'hidden',
  },
  logoContainer: {
    borderRadius: width,
    width: width * 2,
    height: width * 2,
    marginLeft: -(width / 2),
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
    backgroundColor: Config.primayColor,
  },
  logo: {
    height: height / 2.5,
    width: width,
    position: 'absolute',
    bottom: 0,
    marginLeft: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoHeading: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#ffffff',
  },
  loginForm: {
    marginVertical: 20,
    marginHorizontal: 25,
  },
  formInputTitle: {
    fontWeight: 'bold',
    color: '#b6c0cb',
    fontSize: 16,
  },
  // formInput: {
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#e2e2e2',
  //   marginBottom: 15,
  //   fontWeight: 'bold',
  // },
  forgotPassword: {
    fontWeight: 'bold',
    color: Config.primayColor,
    textAlign: 'right',
    fontSize: 16,
  },
  loginBtn: {
    backgroundColor: Config.primaryDark,
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    shadowOffset: {width: 5, height: 3},
    shadowColor: 'red',
    shadowOpacity: 0.5,
    elevation: 5,
  },
  danger: {color: 'red'},
  logoImage: {width: width / 2, height: '100%', resizeMode: 'contain'},
})

const mapStateToProps = (state) => {
  return {
    state: state.AuthReducers,
  }
}

export default connect(mapStateToProps, {loginUser})(LoginScreen)
