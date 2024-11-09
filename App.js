import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './pages/HomeScreen';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import List from './app/screens/List';
import Details from './app/screens/Details';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE_DB } from './FirebaseConfig';
import QuestionScreen from './app/screens/QuestionScreen';
import { doc, setDoc, collection } from 'firebase/firestore';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import AddFriend from './app/friends/AddFriend';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

// InsideLayout for authenticated users
function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Main Page" component={List} />
      <InsideStack.Screen name="Details" component={Details} />
      <InsideStack.Screen name="Add Friends" component={AddFriend} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(null);

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

    return () => unsubscribe();
  }, [answeredQuestions]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // If user is authenticated, show InsideLayout
          <Stack.Screen name="Inside" component={InsideLayout} />
        ) : answeredQuestions ? (
          // If questions are answered but not logged in, show Login screen
          <Stack.Screen name="Login" component={Login} />
        ) : (
          // If user hasn't answered questions yet, show QuestionScreen
          <Stack.Screen name="Questions">
            {props => <QuestionScreen {...props} questionsFinished={setAnsweredQuestions} />}
          </Stack.Screen>
        )}

        {/* Add Register screen to navigation */}
        <Stack.Screen name="Register" component={Register} />
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
