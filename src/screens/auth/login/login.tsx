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
} from 'react-native';
import {styles} from './login.styles';
import String from '../../../constants/string';
import {LoginValuesType} from '../../../types/AuthTypes';
import {LoginScreenProps} from '../../../types/CommonTypes';
import {loginSchema} from '../../../validation/Validation';
import Button from '../../../components/button';
import {useAuthStore} from '../../../store/auth-store';
import {useThemeStore} from '../../../store/theme-store';

const LoginScreen: FC<LoginScreenProps> = props => {
  const [showPassword] = useState<boolean>(true);
  const {isFetching: loading, loginUser} = useAuthStore();
  const {theme} = useThemeStore();
  const initialValues: LoginValuesType = {
    email: '',
    password: '',
  };

  return (
    <SafeAreaView
      style={[styles.SafeAreaViewStyle, {backgroundColor: theme.background}]}>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={async values => loginUser(values)}>
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
                  <Text style={[styles.loginTitle, {color: theme.text}]}>
                    Login to {'\n'}Your Account
                  </Text>

                  <View style={styles.inputView}>
                    <View
                      style={[
                        styles.inputGroup,
                        {borderBottomColor: theme.text},
                      ]}>
                      <TextInput
                        selectionColor={'black'}
                        placeholder={String?.formTitle?.emailAddress}
                        placeholderTextColor={theme.border}
                        style={[styles.inputText2, {color: theme.text}]}
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
                    <View
                      style={[
                        styles.inputGroup,
                        {borderBottomColor: theme.text},
                      ]}>
                      <TextInput
                        selectionColor={'black'}
                        placeholder={'Password'}
                        placeholderTextColor={theme.border}
                        style={[styles.inputText2, {color: theme.text}]}
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
                    onPress={() => props.navigation.navigate('ForgotPassword')}
                    style={styles.forgotPassBtn}>
                    <Text
                      style={[styles.forgotPassBtnText, {color: theme.text}]}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>

                  <Button
                    title="Login"
                    isLoading={loading || false}
                    outlined={true}
                    onPress={handleSubmit}
                  />
                  <Text style={[styles.signupTextBtn, {color: theme.text}]}>
                    Don't have an account yet?{'\n'}
                    <Text
                      style={[styles.signupTextBtn2, {color: theme.text}]}
                      onPress={() => props.navigation.navigate('Signup')}>
                      Sign up Now.
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

export default LoginScreen;
