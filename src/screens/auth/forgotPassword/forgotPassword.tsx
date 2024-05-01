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
import {styles} from './../login/login.styles';
import String from '../../../constants/string';
import {LoginValuesType} from '../../../types/AuthTypes';
import {ForgotPasswordScreenProps} from '../../../types/CommonTypes';
import {loginSchema} from '../../../validation/Validation';

const ForgotPasswordScreen: FC<ForgotPasswordScreenProps> = props => {
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
                    Forgot {'\n'}Password
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
                 <View style={{height:10}}/>
              
                  <TouchableOpacity
                    style={styles.btnBlack}
                    onPress={handleSubmit}>
                    <Text style={styles.btnText}>Submit</Text>
                  </TouchableOpacity>
                 
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
