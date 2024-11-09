import { View, Text, Button } from 'react-native';
import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button onPress={() => navigation.navigate('Details')} title="Open Details" />
            <Button onPress={() => navigation.navigate('Results')} title="Open Results" />
            <Button onPress={() => navigation.navigate('FriendsList')} title="Friend List" />
            <Button onPress={() => navigation.navigate('AddFriends')} title="Add Friends" />
            <Button onPress={() => navigation.navigate('PastResults')} title="Open Past Results" />
            <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
        </View>
    );
}

export default List;
