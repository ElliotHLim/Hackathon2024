import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';  // Make sure to import Firebase authentication

import { signInWithEmailAndPassword } from 'firebase/auth';
import { AppButton } from "../components/AppButton";

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      // After successful login, navigate to the Home screen (or another screen)
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.messageText}>Please enter your email and password.</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <AppButton 
        variant='primary'
        text="Login" 
        onPress={handleLogin} 
      />
      <AppButton 
        variant='secondary'
        text="Create an Account"
        onPress={() => navigation.navigate('Register')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default Login;
