import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../../FirebaseConfig';
import { collection, getDocs, doc } from 'firebase/firestore';

export default function FriendsList() {
  const [friends, setFriends] = useState([]);
  const userId = FIREBASE_AUTH.currentUser?.uid;

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendsCollection = collection(FIRESTORE_DB, `users/${userId}/friends`);
        const friendsSnapshot = await getDocs(friendsCollection);
        const friendsList = friendsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFriends(friendsList);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Friends</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.friendName}>{item.name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  friendName: {
    fontSize: 18,
    paddingVertical: 8,
  },
});
