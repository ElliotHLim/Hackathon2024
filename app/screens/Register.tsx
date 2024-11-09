import { View, TextInput, StyleSheet, ActivityIndicator, Button } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection } from 'firebase/firestore';

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const db = FIRESTORE_DB;

    const signUp = async () => {
        setLoading(true);
        try {
            // Create the user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create the user document in Firestore
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                uid: user.uid,
                username: username,
                created: new Date(),
                friends: [],
            });

            // Create an empty 'assessments' collection inside the user's document
            const assessmentsRef = collection(userRef, 'assessments');
            // Optionally, you could add initial assessment data here, or leave it empty for now
            // For example, you can add a placeholder document for future assessments:
            await setDoc(doc(assessmentsRef, 'initialTest'), {
                testName: 'Spiritual Test Placeholder',
                score: null,  // You can leave it as null until the user takes a test
                dateTaken: null, // Null initially, will be updated when the user takes the test
            });

            console.log('User created and added to Firestore:', user.uid);
            alert('Account created! You can now log in.');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Sign-up failed:', error);
            alert('Sign-up failed: ' + error.message);
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
                <Button title="Create Account" onPress={signUp} />
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
});

export default Register;
    