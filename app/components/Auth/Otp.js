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
import OTPInputView from '@twotalltotems/react-native-otp-input'
import {connect} from 'react-redux'
import {verifyOtp} from './AuthActions'

const {width, height} = Dimensions.get('window')

class Otp extends Component {
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
    this.state = {
      otp: '',
    }
  }

  handleSubmit = async () => {
    const {navigation} = this.props
    const otp = this.state.otp
    await this.props.verifyOtp(otp, navigation)
  }

  render() {
    const {state} = this.props

    return (
      <ScrollView style={styles.mainContainer}>
        <View style={styles.otpWrapper}>
          <View style={styles.otpContainer}>
            <View style={styles.otp}>
              <Text style={styles.otpHeading}>OTP Verification</Text>
            </View>
          </View>
        </View>
        <View style={styles.otpForm}>
          <Text style={styles.formInputTitle}>OTP</Text>
          <OTPInputView
            style={styles.otpFieldWrapper}
            pinCount={6}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              this.setState({otp: code})
            }}
          />
          <TouchableOpacity
            style={styles.otpBtn}
            onPress={() => this.handleSubmit()}>
            {state.otpVerification.loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text style={styles.otpText}>Confirm</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  otpWrapper: {
    flex: 0,
    height: height / 2.5,
    overflow: 'hidden',
  },
  otpContainer: {
    borderRadius: width,
    width: width * 2,
    height: width * 2,
    marginLeft: -(width / 2),
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
    backgroundColor: Config.primayColor,
  },
  otp: {
    height: height / 2.5,
    width: width,
    position: 'absolute',
    bottom: 0,
    marginLeft: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpHeading: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#ffffff',
  },
  otpForm: {
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
  otpBtn: {
    backgroundColor: Config.primaryDark,
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  otpText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    shadowOffset: {width: 5, height: 3},
    shadowColor: 'red',
    shadowOpacity: 0.5,
    elevation: 5,
  },
  otpFieldWrapper: {
    width: '100%',
    height: 100,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  borderStyleHighLighted: {
    borderColor: Config.primayColor,
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 3,
  },
  underlineStyleHighLighted: {
    borderColor: Config.primayColor,
  },
})

const mapStateToProps = state => {
  return {
    state: state.AuthReducers,
  }
}
export default connect(mapStateToProps, {verifyOtp})(Otp)
