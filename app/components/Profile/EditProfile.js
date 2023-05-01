import React, {Component} from 'react'
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  RefreshControl,
  Platform,
  Dimensions,
} from 'react-native'
import {Config} from '../../common'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {CustomTextInput} from '..'
import {connect} from 'react-redux'
import {fetchProfile, updateProfile} from './ProfileActions'
import DateTimePicker from '@react-native-community/datetimepicker'
import FormatDate from '../FormatDate'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import RadioForm from 'react-native-simple-radio-button'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ToastMessage from '../Toast'
import {Picker} from '@react-native-picker/picker'
import {PERMISSIONS, request, check} from 'react-native-permissions'
import ImgToBase64 from 'react-native-image-base64'
import {getCurrentScreen} from '../Auth/AuthActions'

const RESULTS = {
  UNAVAILABLE: 'unavailable',
  DENIED: 'denied',
  LIMITED: 'limited',
  GRANTED: 'granted',
  BLOCKED: 'blocked',
}

class EditProfile extends Component {
  static navigationOptions = () => ({
    header: null,
  })

  state = {
    show: false,
    anvShow: false,
    anvVisible: false,
  }

  componentDidMount() {
    this.fetchProfile(true)
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.props.getCurrentScreen('Profile')
    })
  }

  fetchProfile = async (isRefresh) => {
    const {navigation} = this.props
    await this.props.fetchProfile(navigation, isRefresh)
  }

  render() {
    const UpdateSchema = Yup.object().shape({
      first_name: Yup.string().required('First Name is required.'),
      last_name: Yup.string().required('Last Name is required.'),
      email: Yup.string()
        .email('Invalid Email')
        .required('Email ID is required.'),
      personal_email: Yup.string().email(),
      mobile_no: Yup.string().required('Mobile Number is required.'),
      perm_address: Yup.string().required('Permanent Address is Required.'),
    })

    const gender_props = [
      {label: 'Male  ', value: '0'},
      {label: 'Female', value: '1'},
    ]
    const married_props = [
      {label: 'Married  ', value: '1'},
      {label: 'Unmarried', value: '2'},
    ]

    const {state} = this.props

    const getStatus = (
      result,
      handleGranted,
      handleDenied,
      handleUnavailable,
      handleLimited,
      handleBlocked
    ) => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          handleUnavailable && handleUnavailable()
          break
        case RESULTS.DENIED:
          handleDenied && handleDenied()
          break
        case RESULTS.LIMITED:
          handleLimited && handleLimited()
          break
        case RESULTS.GRANTED:
          handleGranted && handleGranted()
          break
        case RESULTS.BLOCKED:
          handleBlocked && handleBlocked()
          break
      }
    }

    const _pickImageFromCamera = async (setFieldValue) => {
      let options = {
        allowEditing: true,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      }
      launchCamera(options, (response) => {
        if (response.didCancel) {
        } else {
          if (response?.assets?.[0]?.fileSize > 5242880) {
            ToastMessage('Uploaded image is too large.', true)
          } else {
            const source = {uri: response?.assets?.[0]?.uri}
            if (source?.uri) {
              if (setFieldValue) {
                setFieldValue('previewImage', source?.uri)
                ImgToBase64.getBase64String(source?.uri)
                  .then((base64String) => setFieldValue('photo', base64String))
                  .catch((err) => console.log('err', err))
              }
            }
          }
        }
      })
    }

    const _pickImageFromGallery = async (setFieldValue) => {
      let options = {
        allowEditing: true,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      }
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
        } else {
          if (response?.assets?.[0]?.fileSize > 5242880) {
            ToastMessage('Uploaded image is too large.', true)
          } else {
            const source = {uri: response?.assets?.[0]?.uri}
            if (source?.uri) {
              if (setFieldValue) {
                setFieldValue('previewImage', source?.uri)
                ImgToBase64.getBase64String(source?.uri)
                  .then((base64String) => setFieldValue('photo', base64String))
                  .catch((err) => console.log('err', err))
              }
            }
          }
        }
      })
    }

    const takePictureFunction = (setFieldValue) => {
      setTimeout(() => {
        check(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.CAMERA
            : PERMISSIONS.ANDROID.CAMERA
        ).then((result) =>
          getStatus(result, _pickImageFromCamera(setFieldValue), () => {
            request(
              Platform.OS === 'ios'
                ? PERMISSIONS.IOS.CAMERA
                : PERMISSIONS.ANDROID.CAMERA
            ).then((res) => getStatus(res, _pickImageFromCamera(setFieldValue)))
          })
        )
      }, 500)
    }

    const uploadPictureFunction = (setFieldValue) => {
      setTimeout(() => {
        check(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.PHOTO_LIBRARY
            : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        ).then((result) =>
          getStatus(result, _pickImageFromGallery(setFieldValue), () => {
            request(
              Platform.OS === 'ios'
                ? PERMISSIONS.IOS.PHOTO_LIBRARY
                : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
            ).then((res) =>
              getStatus(res, _pickImageFromGallery(setFieldValue))
            )
          })
        )
      }, 500)
    }

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={state.isLoading}
            onRefresh={async () => await this.fetchProfile(false)}
          />
        }>
        {state.isLoading ? (
          <View style={styles.loaderViewStyle}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View>
            {state.profile && (
              <Formik
                initialValues={{
                  gender: state.profile.gender,
                  first_name: state.profile.first_name,
                  last_name: state.profile.last_name,
                  email: state.profile.email,
                  personal_email: state.profile.personal_email,
                  birth_date: state.profile.birth_date,
                  mobile_no: state.profile.mobile_no,
                  alt_contact_no: state.profile.alt_contact_no,
                  marital_status: state.profile.marital_status,
                  wedding_aniv: state.profile.wedding_aniv,
                  blood_group: state.profile.blood_group,
                  temp_address: state.profile.temp_address,
                  perm_address: state.profile.perm_address,
                  photo: state.profile.image_url,
                  previewImage: '',
                }}
                validationSchema={UpdateSchema}
                onSubmit={async (values) => {
                  // console.warn(values);
                  values.previewImage === '' && delete values.photo
                  await this.props.updateProfile(values)
                }}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  setFieldValue,
                }) => (
                  <View style={styles.container}>
                    <Text style={styles.formInputTitle}>First Name</Text>
                    <CustomTextInput
                      placeholderTextColor="#b6c0cb"
                      placeholder="First Name"
                      onBlur={handleBlur('first_name')}
                      onChangeText={handleChange('first_name')}
                      value={values.first_name}
                      error={errors.first_name}
                    />
                    <Text style={styles.formInputTitle}>Last Name</Text>
                    <CustomTextInput
                      placeholderTextColor="#b6c0cb"
                      placeholder="Last Name"
                      onBlur={handleBlur('last_name')}
                      onChangeText={handleChange('last_name')}
                      value={values.last_name}
                      error={errors.last_name}
                    />
                    <Text style={styles.formInputTitle}>Photo</Text>
                    <View style={styles.avatarWrapper}>
                      <Image
                        style={styles.avatarImage}
                        source={{
                          uri:
                            values.previewImage !== ''
                              ? values.previewImage
                              : values.photo,
                        }}
                      />
                      <View>
                        <Text>Note: Max Image Size is 5MB</Text>
                        <TouchableOpacity
                          style={styles.avatarUpload}
                          onPress={() => {
                            takePictureFunction(setFieldValue)
                          }}>
                          <Icon name="camera" size={20} color="#fff" />
                          <Text style={styles.imageUploadText}>
                            Take Picture
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.avatarUpload}
                          onPress={() => {
                            uploadPictureFunction(setFieldValue)
                          }}>
                          <Icon name="image" size={20} color="#fff" />
                          <Text style={styles.imageUploadText}>Upload</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <Text style={styles.formInputTitle}>Company Email</Text>
                    <CustomTextInput
                      editable={false}
                      placeholderTextColor="#b6c0cb"
                      placeholder="Email Address"
                      onBlur={handleBlur('email')}
                      onChangeText={handleChange('email')}
                      value={values.email}
                      error={errors.email}
                    />
                    <Text style={styles.formInputTitle}>Personal Email</Text>
                    <CustomTextInput
                      placeholderTextColor="#b6c0cb"
                      placeholder="Email Address"
                      onBlur={handleBlur('personal_email')}
                      onChangeText={handleChange('personal_email')}
                      value={values.personal_email}
                      error={errors.personal_email}
                    />
                    <Text style={styles.formInputTitle}>Date of Birth</Text>
                    <TouchableOpacity
                      onPress={() => this.setState({show: true})}>
                      <CustomTextInput
                        editable={false}
                        placeholderTextColor="#000"
                        placeholder="Date of Birth"
                        value={FormatDate(values.birth_date)}
                        error={errors.birth_date}
                      />
                    </TouchableOpacity>
                    {this.state.show && (
                      <DateTimePicker
                        value={new Date(values.birth_date)}
                        mode="date"
                        display="calendar"
                        onChange={(event, date) => {
                          if (event.type !== 'dismissed') {
                            this.setState({show: false})
                            setFieldValue('birth_date', date)
                          } else {
                            this.setState({show: false})
                          }
                        }}
                      />
                    )}
                    <Text style={styles.formInputTitle}>Gender</Text>
                    <RadioForm
                      style={styles.radioButtons}
                      radio_props={gender_props}
                      initial={values.gender === 0 ? 0 : 1}
                      formHorizontal={true}
                      labelHorizontal={true}
                      onPress={(value) => {
                        setFieldValue('gender', value)
                      }}
                    />
                    <Text style={styles.formInputTitle}>Marital Status</Text>
                    <RadioForm
                      style={styles.radioButtons}
                      radio_props={married_props}
                      initial={values.marital_status === 1 ? 0 : 1}
                      formHorizontal={true}
                      labelHorizontal={true}
                      onPress={(value) => {
                        setFieldValue('marital_status', value)
                        this.setState({
                          anvVisible: value === '1' ? true : false,
                        })
                      }}
                    />
                    {(this.state.anvVisible || values.marital_status === 1) && (
                      <>
                        <Text style={styles.formInputTitle}>
                          Wedding Anniversary
                        </Text>
                        <TouchableOpacity
                          onPress={() => this.setState({anvShow: true})}>
                          <CustomTextInput
                            editable={false}
                            placeholderTextColor="#000"
                            placeholder="Wedding Anniversary"
                            onChangeText={handleChange('wedding_aniv')}
                            value={FormatDate(
                              values.wedding_aniv
                                ? values.wedding_aniv
                                : new Date()
                            )}
                            error={errors.wedding_aniv}
                          />
                        </TouchableOpacity>
                        {this.state.anvShow && (
                          <DateTimePicker
                            value={
                              values.wedding_aniv
                                ? new Date(values.wedding_aniv)
                                : new Date()
                            }
                            mode="date"
                            display="calendar"
                            onChange={(event, date) => {
                              if (event.type !== 'dismissed') {
                                this.setState({anvShow: false})
                                setFieldValue('wedding_aniv', date)
                              } else {
                                this.setState({anvShow: false})
                              }
                            }}
                          />
                        )}
                      </>
                    )}
                    <Text style={styles.formInputTitle}>Blood Group</Text>
                    <Picker
                      selectedValue={values.blood_group}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('blood_group', itemValue)
                      }>
                      <Picker.Item label="A+" value="A+" />
                      <Picker.Item label="A-" value="A-" />
                      <Picker.Item label="B+" value="B+" />
                      <Picker.Item label="B-" value="B-" />
                      <Picker.Item label="O+" value="O+" />
                      <Picker.Item label="O-" value="O-" />
                      <Picker.Item label="AB+" value="AB+" />
                      <Picker.Item label="AB-" value="AB-" />
                    </Picker>
                    <View style={styles.formInput} />
                    <Text style={styles.formInputTitle}>Temporary Address</Text>
                    <CustomTextInput
                      placeholderTextColor="#b6c0cb"
                      placeholder="Temporary Address"
                      multiline={true}
                      onBlur={handleBlur('temp_address')}
                      onChangeText={handleChange('temp_address')}
                      value={values.temp_address}
                      error={errors.temp_address}
                    />
                    <Text style={styles.formInputTitle}>Permanent Address</Text>
                    <CustomTextInput
                      placeholderTextColor="#b6c0cb"
                      placeholder="Permanent Address"
                      multiline={true}
                      onBlur={handleBlur('perm_address')}
                      onChangeText={handleChange('perm_address')}
                      value={values.perm_address}
                      error={errors.perm_address}
                    />
                    <Text style={styles.formInputTitle}>
                      Personal Mobile Number
                    </Text>
                    <CustomTextInput
                      placeholderTextColor="#b6c0cb"
                      placeholder="Mobile Number"
                      onBlur={handleBlur('mobile_no')}
                      onChangeText={handleChange('mobile_no')}
                      value={values.mobile_no}
                      error={errors.mobile_no}
                    />
                    <Text style={styles.formInputTitle}>
                      Alternate Contact No
                    </Text>
                    <CustomTextInput
                      placeholderTextColor="#b6c0cb"
                      placeholder="Alternate Contact No"
                      onBlur={handleBlur('alt_contact_no')}
                      onChangeText={handleChange('alt_contact_no')}
                      value={values.alt_contact_no}
                      error={errors.alt_contact_no}
                    />
                    <TouchableOpacity
                      disabled={state.updateProfile.loading}
                      style={styles.updateBtn}
                      onPress={handleSubmit}>
                      {state.updateProfile.loading ? (
                        <ActivityIndicator size="large" color="#fff" />
                      ) : (
                        <Text style={styles.updateText}>Update Profile</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            )}
          </View>
        )}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
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
  updateBtn: {
    backgroundColor: Config.primaryDark,
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  updateText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    shadowOffset: {width: 5, height: 3},
    shadowColor: 'red',
    shadowOpacity: 0.5,
    elevation: 5,
  },
  avatarUpload: {
    backgroundColor: Config.primaryDark,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 50,
    // borderRadius: '50%',
    margin: 15,
  },
  avatarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageUploadText: {
    color: '#fff',
    textAlign: 'center',
    marginLeft: 5,
  },
  radioButtons: {
    marginVertical: 8,
  },
  loaderViewStyle: {
    height: Dimensions.get('screen').height,
    justifyContent: 'center',
  },
})

const mapStateToProps = (state) => {
  return {
    state: state.ProfileReducers,
  }
}
export default connect(mapStateToProps, {
  fetchProfile,
  updateProfile,
  getCurrentScreen,
})(EditProfile)
