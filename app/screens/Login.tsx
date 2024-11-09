import { View, TextInput, StyleSheet, ActivityIndicator, Button } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } 
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Check your email!');
        }
        catch(error) {
            console.log(error);
            alert('Sign up failed: ' + error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
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
                    <Button title="Login" onPress={signIn} />
                    <Button title="Create account" onPress={signUp} />
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
});

export default Login;
