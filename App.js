import 'react-native-get-random-values';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './pages/HomeScreen';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import Results from './app/screens/Results';
import List from './app/screens/List';
import Details from './app/screens/Details';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE_DB } from './FirebaseConfig';
import QuestionScreen from './app/screens/QuestionScreen';
import { WelcomeScreen } from './app/screens/WelcomeScreen';
import * as Font from 'expo-font';
import { doc, setDoc, collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import AddFriend from './app/friends/AddFriend'
import FriendsList from './app/friends/FriendsList'
import FindFriend from './app/friends/FindFriend'


const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

// InsideLayout for authenticated users
function InsideLayout(props1) {
  console.log('assessment insidelayout', props1.assessment);
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Main Pages" component={List} />
      <InsideStack.Screen name="Details" component={Details} />
      <InsideStack.Screen name="Results">
        {props => <Results {...props} assessment={props1.assessment} />}
      </InsideStack.Screen>

      {/* <InsideStack.Screen name="Add Friends" component={AddFriend} />
      <InsideStack.Screen name="Friends List" component={FriendsList} />
    <InsideStack.Screen name="Find Friend" component={FindFriend} /> */}
    </InsideStack.Navigator>
  );  
}


export default function App() {
  const [user, setUser] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // First useEffect for font loading
  useEffect(() => {
    const loadFonts = async () => {
      try {
        console.log('Starting font load...');
        await Font.loadAsync({
          'Satoshi-Regular': require('./assets/fonts/Satoshi/Satoshi-Regular.otf'),
        });
        console.log('Fonts loaded successfully');
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        setFontsLoaded(true);
      }
    };

    loadFonts();
  }, []); // Empty dependency array as this should only run once

  // Second useEffect for user and assessment handling
  useEffect(() => {
    // console.log('user', user);
    if (answeredQuestions && user) {
      // console.log('answeredQuestions', answeredQuestions, 'user', user);
      // add new user results to firebase (results table)
      const db = FIRESTORE_DB;
      const assessmentRef = doc(db, 'assessments', uuidv4());
      setDoc(assessmentRef, {
        userId: user.uid,
        results: answeredQuestions,
      });
    }
  }, [user, answeredQuestions]); // Added answeredQuestions to dependencies

  // Set up auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []); // Empty dependency array means this only runs once on mount

  // Show loading screen while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Main app render
  return (
    // <WelcomeScreen />
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // If user is authenticated, show InsideLayout
          <Stack.Screen name="Inside">
            {props => <InsideLayout {...props} assessment={answeredQuestions} />}
          </Stack.Screen>
        ) : answeredQuestions ? (
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        ) : (
          <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
          <Stack.Screen name="Questions">
            {props => <QuestionScreen {...props} questionsFinished={setAnsweredQuestions} />}
          </Stack.Screen>
          </>
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
}