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
import { FIREBASE_AUTH } from './FirebaseConfig';

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
  const [loading, setLoading] = useState(true); // Track loading state

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      setLoading(false); // Stop loading once user state is determined
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loading} />; // Show loading indicator while checking auth state
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // If user is logged in, show the authenticated user flow (InsideLayout)
          <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }} />
        ) : (
          // If user is not logged in, show Login and Register screens
          <>
            <Stack.Screen 
              name="Login" 
              component={Login} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="Register" 
              component={Register} 
              options={{ headerShown: false }} 
            />
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
