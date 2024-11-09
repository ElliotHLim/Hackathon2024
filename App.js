import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './pages/HomeScreen';
import Login from './app/screens/Login';  // Ensure path is correct
import Register from './app/screens/Register';  // Ensure path is correct
import List from './app/screens/List'; // Ensure path is correct
import Details from './app/screens/Details'; // Ensure path is correct
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE_DB } from './FirebaseConfig';
import QuestionScreen from './app/screens/QuestionScreen';
import { doc, setDoc, collection } from 'firebase/firestore';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

// InsideLayout for authenticated users
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

  useEffect(() => {
    console.log('user', user);
    if (answeredQuestions && user) {
      console.log('answeredQuestions', answeredQuestions, 'user', user);
      // add new user results to firebase (results table)
      const db = FIRESTORE_DB;
      const assessmentRef = doc(db, 'assessments', uuidv4());
      setDoc(assessmentRef, {
        userId: user.uid,
        results: answeredQuestions,
      });
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      if (answeredQuestions && user) {
        console.log('answeredQuestions', answeredQuestions);
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  // user flow is questions first, then login

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // If user is logged in, show the authenticated user flow (InsideLayout)
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
