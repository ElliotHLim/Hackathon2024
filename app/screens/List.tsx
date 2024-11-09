import { View, Text, Button } from 'react-native';
import React from 'react'
import { NavigationProp, Router } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}


const List = ({ navigation }: RouterProps) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Button onPress={() => navigation.navigate('details')} title="Open Details" />
            <Button onPress={() => FIREBASE_AUTH.signOut()} title="Log Out" />
        </View>
    )
}

export default List;