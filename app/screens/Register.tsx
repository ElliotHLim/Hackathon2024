import { View, TextInput, StyleSheet, ActivityIndicator, Button, Text } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);  // State to store error message
    const auth = FIREBASE_AUTH;
    const db = FIRESTORE_DB;
    const navigation = useNavigation(); // Using navigation hook

    const signUp = async () => {
        setLoading(true);
        setError(null);  // Reset error state before each sign-up attempt

        // Validate inputs
        if (!email || !password || !username) {
            alert("Please fill in all fields");
            setLoading(false);
            return;
        }

        try {
            // Create the user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create the user document in Firestore
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                uid: user.uid,
                username: username,
                email: email,
                created: new Date(),
                friends: [],
            });
            
            // Create an empty 'assessments' collection inside the user's document
            const assessmentsRef = collection(userRef, 'assessments');
            await setDoc(doc(assessmentsRef, 'initialTest'), {
                testName: 'Spiritual Test Placeholder',
                score: null,
                dateTaken: null,
            });

            console.log('User created and added to Firestore:', user.uid);

            // Sign in the user immediately after successful sign-up
            await signInWithEmailAndPassword(auth, email, password);

            alert('Account created and logged in successfully!');
            navigation.navigate('List');  // Navigate to the home page or any other page

        } catch (error) {
            console.error('Sign-up failed:', error);

            // Handle specific errors
            let errorMessage = "Sign-up failed: " + error.message;
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "This email is already in use. Please try a different one.";
            }

            setError(errorMessage);  // Set the error message in state
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput 
                value={username} 
                style={styles.input} 
                placeholder="Username" 
                autoCapitalize="none" 
                onChangeText={(text) => setUsername(text)} 
            />
            <TextInput 
                value={email} 
                style={styles.input} 
                placeholder="Email" 
                autoCapitalize="none" 
                onChangeText={(text) => setEmail(text)} 
            />
            <TextInput 
                secureTextEntry={true} 
                value={password} 
                style={styles.input} 
                placeholder="Password" 
                autoCapitalize="none" 
                onChangeText={(text) => setPassword(text)} 
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <Button title="Create Account" onPress={signUp} />
                    {error && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}
                    {/* Always show the 'Back to Login' button */}
                    <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
                </>
            )}
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
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    errorContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default Register;
