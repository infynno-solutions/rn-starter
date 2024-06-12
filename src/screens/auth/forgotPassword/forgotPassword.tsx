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
import Button from '../../../components/button';
import Header from '../../../components/header';
import Icons from '../../../components/vectorIconSet';
import {useThemeStore} from '../../../store/theme-store';

const ForgotPasswordScreen: FC<ForgotPasswordScreenProps> = props => {
  const [showPassword] = useState<boolean>(true);
  const {theme} = useThemeStore();
  const initialValues: LoginValuesType = {
    email: '',
    password: '',
  };

  return (
    <SafeAreaView
      style={[styles.SafeAreaViewStyle, {backgroundColor: theme.background}]}>
      <Header
        title=""
        customStyles={{borderBottomWidth: 0}}
        leftChildren={[
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Icons.MaterialIcons
              size={20}
              color={theme.text}
              name="arrow-back"
            />
          </TouchableOpacity>,
        ]}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={values => {}}>
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
                    Forgot {'\n'}Password
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

                  <Button
                    title="SUBMIT"
                    outlined={true}
                    onPress={handleSubmit}
                  />
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
