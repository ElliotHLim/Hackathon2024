import { View, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
/* Youtube Tutorial: https://www.youtube.com/watch?v=ONAVmsGW6-M&t=492s*/
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

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