import Snackbar from 'react-native-snackbar'
import {Config} from '../common'

const ToastMessage = (message, error = false) =>
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: error ? Config.errorColor : Config.successColor,
  })

export default ToastMessage
