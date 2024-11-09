import 'react-native-get-random-values';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE_DB } from './FirebaseConfig';

//screens
import { WelcomeScreen } from './app/screens/WelcomeScreen';
import { NameScreen } from './app/screens/NameScreen';
import HomeScreen from './pages/HomeScreen';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import List from './app/screens/List';
import Details from './app/screens/Details';
import QuestionScreen from './app/screens/QuestionScreen';
import FriendsList from './app/friends/FriendsList';
import FindFriend from './app/friends/FindFriend';
import * as Font from 'expo-font';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import AddFriend from './app/friends/AddFriend'
import PastResults from './app/screens/PastResults';
import Results from './app/screens/Results';
import { ReflectScreen } from './app/screens/ReflectScreen';


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
      <InsideStack.Screen name="PastResults" component={PastResults} />

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

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          'Satoshi-Regular': require('./assets/fonts/Satoshi/Satoshi-Regular.otf'),
          'Satoshi-Bold': require('./assets/fonts/Satoshi/Satoshi-Bold.otf'),
          'Satoshi-Black': require('./assets/fonts/Satoshi/Satoshi-Black.otf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        setFontsLoaded(true);
      }
    };

    loadFonts();
  }, []);

  useEffect(() => {
    if (answeredQuestions && user) {
      const assessmentRef = doc(FIRESTORE_DB, 'assessments', uuidv4());
      setDoc(assessmentRef, {
        userId: user.uid,
        results: answeredQuestions,
      });
    }
  }, [user, answeredQuestions]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {user ? (
          <Stack.Screen name="Inside"  options={{ headerShown: false }}>
            {props => <InsideLayout {...props} assessment={answeredQuestions} />}
          </Stack.Screen>
        ) : answeredQuestions ? (
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        ) : (
          <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
          <Stack.Screen name="Name" component={NameScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Reflect" component={ReflectScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Questions">
            {props => <QuestionScreen {...props} questionsFinished={setAnsweredQuestions} />}
          </Stack.Screen>
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          </>
        )}
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
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
