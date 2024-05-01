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

const LoginScreen: FC<LoginScreenProps> = props => {
  const [showPassword] = useState<boolean>(true);
  const initialValues: LoginValuesType = {
    email: '',
    password: '',
  };

  return (
    <SafeAreaView style={styles.SafeAreaViewStyle}>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={values => {
          console.log(values);
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
                    Login to {'\n'}Your Account
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
                    onPress={() => props.navigation.navigate('ForgotPassword')}
                    style={styles.forgotPassBtn}>
                    <Text style={styles.forgotPassBtnText}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnBlack}
                    onPress={handleSubmit}>
                    <Text style={styles.btnText}>Login</Text>
                  </TouchableOpacity>
                  <Text style={styles.signupTextBtn}>
                    Don't have an account yet?{'\n'}
                    <Text
                      style={styles.signupTextBtn2}
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
