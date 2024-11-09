import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './pages/HomeScreen';
import Login from './app/screens/Login';
import List from './app/screens/List'; // Adjust path if needed
import Details from './app/screens/Details'; // Adjust path if needed
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import QuestionScreen from './app/screens/QuestionScreen';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();
function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="My todos" component={List} />
      <InsideStack.Screen name="Details" component={Details} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null); // Initialize without User reference
  const [answeredQuestions, setAnsweredQuestions] = useState(null); // is type Results

  useEffect(() => {
    console.log('answeredQuestions', answeredQuestions);
  }, [answeredQuestions]);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
      if (answeredQuestions && user) {
        console.log('answeredQuestions', answeredQuestions);
        // add new user results to firebase (results table)
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  // user flow is questions first, then login

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }} />
        ) : answeredQuestions ? (
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Questions">
            {props => <QuestionScreen {...props} questionsFinished={setAnsweredQuestions} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});