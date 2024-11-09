
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../../FirebaseConfig';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';

export default function FindFriend() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const userId = FIREBASE_AUTH.currentUser?.uid;

  const handleSearch = async () => {
    try {
      const usersRef = collection(FIRESTORE_DB, 'users');
      const q = query(usersRef, where('name', '==', searchText));
      const querySnapshot = await getDocs(q);

      const users = querySnapshot.docs
        .filter((doc) => doc.id !== userId) // Exclude the current user
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      setSearchResults(users);
    } catch (error) {
      console.error('Error searching for friends:', error);
    }
  };

  const handleAddFriend = async (friendId) => {
    try {
      const userFriendRef = doc(FIRESTORE_DB, `users/${userId}/friends/${friendId}`);
      await setDoc(userFriendRef, { friendId });
      alert('Friend added!');
    } catch (error) {
      console.error('Error adding friend:', error);
      alert('Failed to add friend');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by name"
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultText}>{item.name}</Text>
            <Button title="Add Friend" onPress={() => handleAddFriend(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  resultText: {
    fontSize: 18,
  },
});
