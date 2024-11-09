import 'react-native-get-random-values';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE_DB } from './FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

// Screens
import { WelcomeScreen } from './app/screens/WelcomeScreen';
import { NameScreen } from './app/screens/NameScreen';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import List from './app/screens/List';
import Details from './app/screens/Details';
import QuestionScreen from './app/screens/QuestionScreen';
import AddFriend from './app/friends/AddFriend';
import FriendsList from './app/friends/FriendsList';
import FindFriend from './app/friends/FindFriend';
import * as Font from 'expo-font';
import PastResults from './app/screens/PastResults';
import Results from './app/screens/Results';
import { ReflectScreen } from './app/screens/ReflectScreen';


const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout({ assessment }) {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Main Pages" component={List} />
      <InsideStack.Screen name="Details" component={Details} />
      <InsideStack.Screen name="AddFriends" component={AddFriend} />
      <InsideStack.Screen name="FindFriends" component={FindFriend} />
      <InsideStack.Screen name="FriendsList" component={FriendsList} />
      <InsideStack.Screen name="Results">
        {(props) => <Results {...props} assessment={assessment} />}
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
        setFontsLoaded(true);  // Proceed even if fonts don't load
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
});
