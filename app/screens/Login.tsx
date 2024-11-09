import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const Login = ({ navigation }: any) => {
  const handleLogin = () => {
    // Handle login logic here
    // After successful login, you can navigate to another screen
    navigation.navigate('Home'); // Replace 'Home' with your desired screen
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <TextInput placeholder="Username" style={styles.input} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Go to Register"
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
