import {Dimensions, PixelRatio, StyleSheet} from 'react-native';
import colors from '../constants/color';

const {height, width} = Dimensions.get('window');

export const Responsive = {
  getHeight: function (h: number) {
    return PixelRatio.roundToNearestPixel(height * (h / 812));
  },
  getWidth: function (w: number) {
    return PixelRatio.roundToNearestPixel(width * (w / 375));
  },
};

const widthPercentageToDP = (widthPercent: string) => {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};

const heightPercentageToDP = (heightPercent: string) => {
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
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
  container2: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.theme,
  },
  container3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  btnText: {color:colors.black,
    fontSize: Responsive.getWidth(14),
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  btnBlack: {
    width: '100%',color:colors.black,
    borderRadius: Responsive.getWidth(10),
    height: Responsive.getWidth(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    marginTop:10,
  },
  forgotPassBtn: {
    alignSelf: 'center',
    marginTop: Responsive.getWidth(10),
    marginBottom: Responsive.getWidth(10),
  },
  forgotPassBtnText: {color:colors.black,
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

export {widthPercentageToDP as wp, heightPercentageToDP as hp};
