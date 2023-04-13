import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';
import {CommonActions} from '@react-navigation/native';

export function navigationWithStackClear(ScreenName:string, navigation:any) {
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: ScreenName}],
    }),
  );
}

export function navigationToScreen(ScreenName:string, navigation:any, passObject:any) {
  navigation.navigate(ScreenName, passObject);
}

export function ReplaceToScreen(ScreenName:string, navigation:any, passObject:any) {
  navigation.replace(ScreenName, passObject);
}

export function showAlert(title:string, message:string) {
  Alert.alert(title, message);
}

export function goBack(navigation:any, num = 1) {
  navigation.pop(num);
}

export function resetNavigation(navigation:any, initialScreeName:string) {
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: initialScreeName}],
    }),
  );
}

export function showToast_success(title:string, message:string, _onPress = () => {}) {
  if (message) {
    return Toast.show({
      type: 'success',
      text2: message,
      onPress: _onPress,
      visibilityTime: 3000,
    });
  }
}

export function showToast_error(title:string, message:string, _onPress = () => {}) {
  if (message) {
    return Toast.show({
      type: 'error',
      text2: message,
      onPress: _onPress,
      visibilityTime: 3000,
    });
  }
}

export function showToast_info(title:string, message:string, _onPress = () => {}) {
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
