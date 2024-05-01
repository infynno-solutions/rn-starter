import {Formik} from 'formik';
import React, {FC, useState} from 'react';
import {
  Platform,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {styles} from '../login/login.styles';
import String from '../../../constants/string';
import {LoginValuesType} from '../../../types/AuthTypes';
import {SignupScreenProps} from '../../../types/CommonTypes';
import {loginSchema} from '../../../validation/Validation';
import colors from '../../../constants/color';
import {registerUser} from '../../../store/auth/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../../App';

const SignupScreen: FC<SignupScreenProps> = props => {
  const [showPassword] = useState<boolean>(true);
  const loading = useSelector((state: RootState) => state.auth.isFetching);
  const dispatch = useDispatch<AppDispatch>();
  const initialValues: LoginValuesType = {
    email: '',
    password: '',
  };

  return (
    <SafeAreaView style={styles.SafeAreaViewStyle}>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={async values => {
          dispatch(
            registerUser({
              ...values,
              onSuccess: () => {
                props.navigation.goBack();
              },
            }),
          );
        }}>
        {({
          values,
          touched,
          errors,
          handleSubmit,
          setFieldTouched,
          handleChange,
        }) => (
          <>
            <KeyboardAvoidingView
              style={styles.KeyboardAvoidingView}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
              <ScrollView
                contentContainerStyle={styles.ScrollView}
                keyboardShouldPersistTaps="handled">
                <View style={styles.content}>
                  <Text style={styles.loginTitle}>
                    Create {'\n'}Your Account
                  </Text>
                  <View style={styles.inputView}>
                    <View style={styles.inputGroup}>
                      <TextInput
                        selectionColor={'black'}
                        placeholder={String?.formTitle?.emailAddress}
                        placeholderTextColor={'black'}
                        style={styles.inputText2}
                        blurOnSubmit
                        autoCapitalize="none"
                        clearButtonMode="while-editing"
                        autoCorrect={false}
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={() => setFieldTouched('email')}
                        keyboardType="email-address"
                      />
                    </View>
                    {touched.email && errors.email && (
                      <Text style={styles.errorMsg}>{errors.email}</Text>
                    )}
                  </View>
                  <View style={styles.inputView}>
                    <View style={styles.inputGroup}>
                      <TextInput
                        selectionColor={'black'}
                        placeholder={'Password'}
                        placeholderTextColor={'black'}
                        style={styles.inputText2}
                        secureTextEntry={showPassword}
                        blurOnSubmit
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={() => setFieldTouched('password')}
                      />
                    </View>
                    {touched.password && errors.password && (
                      <Text style={styles.errorMsg}>{errors.password}</Text>
                    )}
                  </View>

                  <TouchableOpacity
                    style={styles.btnBlack}
                    onPress={handleSubmit}>
                    {loading ? (
                      <ActivityIndicator size={'small'} color={colors.black} />
                    ) : (
                      <Text style={styles.btnText}>Sign Up</Text>
                    )}
                  </TouchableOpacity>
                  <Text style={styles.signupTextBtn}>
                    Already have an account?{'\n'}
                    <Text
                      style={styles.signupTextBtn2}
                      onPress={() => props.navigation.navigate('Login')}>
                      Sign In Now.
                    </Text>
                  </Text>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default SignupScreen;
