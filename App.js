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
import { FIREBASE_AUTH } from './FirebaseConfig';
import QuestionScreen from './app/screens/QuestionScreen';
import { WelcomeScreen } from './app/screens/WelcomeScreen';
import * as Font from 'expo-font';

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
  const [user, setUser] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Load fonts and set up auth listener in parallel
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          'Satoshi-Regular': require('./assets/fonts/Satoshi/Satoshi-Regular.otf'),
          // Add other font weights as needed
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        setFontsLoaded(true); // Still set to true so app can run with system fonts
      }
    };

    loadFonts();

    // Set up auth listener
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      if (answeredQuestions && user) {
        console.log('answeredQuestions', answeredQuestions);
        // add new user results to firebase (results table)
      }
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
    <WelcomeScreen appName='Waypoint'/>
    /* <NavigationContainer>
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
    </NavigationContainer> */
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