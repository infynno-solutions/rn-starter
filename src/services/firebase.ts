import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Alert } from 'react-native';

const signUpUsingEmailPassword= async (params:RegisterUserParams) => {
  try {
    const res = await auth()
    .createUserWithEmailAndPassword(
      params?.email,
      params?.password,
    )
      Alert.alert('Success','User account created successfully');
      return res
  
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      Alert.alert('Warning','That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      Alert.alert('Warning','That email address is invalid!');
    }
    if (error.code === 'auth/invalid-credential') {
      Alert.alert('Warning','Invalid email or password!');
    }
    throw error;
  }
    
};

const signInUsingEmailPassword= async (params:LoginUserParams) => {
  try {
    const res = await auth()
    .signInWithEmailAndPassword(
      params?.email,
      params?.password,
    )
    
      return res
  
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      Alert.alert('Warning','That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      Alert.alert('Warning','That email address is invalid!');
    }
    if (error.code === 'auth/invalid-credential') {
      Alert.alert('Warning','Invalid email or password!');
    }
    throw error
  }
  };

  const signOut = ()=>{
    auth().signOut();
  }

export {signUpUsingEmailPassword,signInUsingEmailPassword,signOut}