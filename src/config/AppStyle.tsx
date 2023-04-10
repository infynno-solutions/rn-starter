import {Dimensions, PixelRatio, StyleSheet} from 'react-native';
import colors from './Color';

const {height, width} = Dimensions.get('window');

export const Responsive = {
  getHeight: function (h: number) {
    return PixelRatio.roundToNearestPixel(height * (h / 812));
  },
  getWidth: function (w: number) {
    return PixelRatio.roundToNearestPixel(width * (w / 375));
  },
};

export default StyleSheet.create({
  SafeAreaViewStyle: {
    flex: 1,
  },
  KeyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.theme,
  },
  ScrollView: {
    position: 'relative',
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: Responsive.getWidth(20),
  },
  inputView: {
    marginBottom: Responsive.getWidth(8),
    justifyContent: 'center',
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    fontSize: Responsive.getWidth(14),
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  btnBlack: {
    width: '100%',
    borderRadius: Responsive.getWidth(10),
    height: Responsive.getWidth(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  forgotPassBtn: {
    alignSelf: 'center',
    marginTop: Responsive.getWidth(10),
    marginBottom: Responsive.getWidth(10),
  },
  forgotPassBtnText: {
    fontSize: Responsive.getWidth(14),
  },
  inputGroup: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});
