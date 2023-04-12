import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';
import {CommonActions} from '@react-navigation/native';

export function navigationWithStackClear(ScreenName, navigation) {
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: ScreenName}],
    }),
  );
}

export function navigationToScreen(ScreenName, navigation, passObject) {
  navigation.navigate(ScreenName, passObject);
}

export function ReplaceToScreen(ScreenName, navigation, passObject) {
  navigation.replace(ScreenName, passObject);
}

export function showAlert(title, message) {
  Alert.alert(title, message);
}

export function goBack(navigation, num = 1) {
  navigation.pop(num);
}

export function resetNavigation(props, initialScreeName) {
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: initialScreeName}],
    }),
  );
}

export function showToast_success(title, message, _onPress = () => {}) {
  if (message) {
    return Toast.show({
      type: 'success',
      text2: message,
      onPress: _onPress,
      visibilityTime: 3000,
    });
  }
}

export function showToast_error(title, message, _onPress = () => {}) {
  if (message) {
    return Toast.show({
      type: 'error',
      text2: message,
      onPress: _onPress,
      visibilityTime: 3000,
    });
  }
}

export function showToast_info(title, message, _onPress = () => {}) {
  if (message) {
    return Toast.show({
      type: 'info',
      text2: message,
      onPress: _onPress,
      visibilityTime: 3000,
    });
  }
}

export async function isInternetConnected() {
  let status = await NetInfo.fetch();
  return status.isConnected;
}
