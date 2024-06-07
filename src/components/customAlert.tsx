import {useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../constants/color';
import appStyle, {Responsive} from '../styles/appStyle';
import Button from './button';
import WebView from 'react-native-webview';
import {webViewScript} from '../utils/helper';
import {useSelector} from 'react-redux';
import {RootState} from '../../App';
import {CustomAlertProps} from '../interfaces/componentsInterface/componentInterfaces';

const CustomAlert = ({
  displayTitle,
  displayMsg,
  visibility,
  dismissAlert,
  cancelButtonText,
  buttonText,
  onPressButton,
  isLoading,
  isHtml = false,
  hideDismissButton = false,
}: CustomAlertProps) => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  const [webViewHeight, setWebViewHeight] = useState(0);
  const [webViewLoading, setWebViewLoading] = useState(false);

  return (
    <View>
      <Modal visible={visibility} animationType={'fade'} transparent={true}>
        <View
          style={[styles.wrapper, {backgroundColor: `${theme.background}cc`}]}>
          <View
            style={[
              styles.container,
              {
                backgroundColor: theme.background,
                borderColor: theme.border,
              },
            ]}>
            <View style={styles.textContainer}>
              <Text
                style={[
                  appStyle.forgotPassBtnText,
                  {
                    color: theme.text,
                    fontSize: Responsive.getWidth(14),
                  },
                ]}>
                {displayTitle}
              </Text>
              {webViewLoading ? (
                <ActivityIndicator size={'large'} color={theme.text} />
              ) : null}
              {isHtml ? (
                <View
                  style={[
                    styles.webviewWrapper,
                    {
                      backgroundColor: theme.background,

                      height: webViewHeight > 200 ? 200 : webViewHeight,
                    },
                  ]}>
                  <WebView
                    originWhitelist={['*']}
                    style={[
                      appStyle.container,
                      {backgroundColor: theme.background},
                    ]}
                    containerStyle={[
                      styles.webviewContainer,
                      {backgroundColor: theme.background},
                    ]}
                    javaScriptEnabled={true}
                    scrollEnabled={webViewHeight > 200}
                    scalesPageToFit={Platform.OS === 'android'}
                    onMessage={event =>
                      setWebViewHeight(Number(event?.nativeEvent?.data) + 30)
                    }
                    onLoadStart={() => setWebViewLoading(true)}
                    onLoadEnd={() => setWebViewLoading(false)}
                    decelerationRate={'normal'}
                    injectedJavaScript={webViewScript}
                    domStorageEnabled={true}
                    source={{
                      html: `<!DOCTYPE html>
                  <html>
                  <head>
                  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">
                  <style>
                 body {
                    font-family: "Open Sans", sans-serif;
                    margin: 0;
                    padding: 0 10px;
                 }</style>
                   <meta name="viewport" content="width=device-width, initial-scale=1">
                  </head><body style="margin: 0;background-color:${theme.background};color: ${theme.text};">${displayMsg}</body></html>`,
                    }}
                  />
                </View>
              ) : (
                <Text
                  style={[
                    appStyle.smallText,
                    {
                      color: theme.text,
                    },
                  ]}>
                  {displayMsg}
                </Text>
              )}
            </View>
            <View style={styles.buttonsContainer}>
              {hideDismissButton ? null : (
                <Button
                  buttonWidth={'40%'}
                  customStyle={[
                    styles.buttonDismiss,
                    {
                      backgroundColor: `${theme.border}`,
                      borderColor: theme.border,
                    },
                  ]}
                  onPress={() => dismissAlert(false)}
                  title={cancelButtonText || ''}
                />
              )}
              <Button
                buttonWidth={'40%'}
                customStyle={[
                  styles.buttonConfirm,
                  {backgroundColor: `${theme.text}`},
                ]}
                onPress={() => {
                  onPressButton && onPressButton();
                }}
                isLoading={isLoading}
                disabled={isLoading}
                title={buttonText || ''}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 8,
    paddingTop: 16,
  },
  buttonDismiss: {
    flex: 1,
  },
  buttonConfirm: {flex: 1},
  container: {
    alignItems: 'center',

    width: '90%',
    borderWidth: 1,

    borderRadius: 7,
    elevation: 10,
    padding: 16,
  },
  textContainer: {width: '100%', rowGap: 12},
  webviewContainer: {
    borderRadius: 10,
  },
  webviewWrapper: {
    width: '100%',
  },
});
