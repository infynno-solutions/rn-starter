import {StyleSheet} from 'react-native'
import {Config} from '.'

export default StyleSheet.create({
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
  btnStyle: {
    backgroundColor: Config.primaryDark,
    borderRadius: 10,
    width: 160,
    paddingVertical: 13,
    paddingHorizontal: 16,
    marginTop: 30,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    shadowOffset: {width: 5, height: 3},
    shadowColor: 'red',
    shadowOpacity: 0.5,
    elevation: 5,
  },
  buttonViewStyle: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    position: 'relative',
    bottom: 15,
  },
  loaderViewStyle: {
    height: '100%',
    justifyContent: 'center',
  },
  errorTextStyle: {
    color: 'red',
    marginTop: 5,
    marginLeft: 5,
  },
  bottomLineStyle: {
    borderBottomWidth: 2,
    borderBottomColor: '#e9ecef',
    paddingHorizontal: 10,
    width: '100%',
    paddingVertical: 10,
  },
})
