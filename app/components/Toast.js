import Snackbar from 'react-native-snackbar'
import {Config} from '../common'

const ToastMessage = (message, error = false) =>
  Snackbar.show({
    title: message,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: error ? Config.errorColor : Config.successColor,
  })

export default ToastMessage
