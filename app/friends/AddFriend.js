import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../FirebaseConfig';
import { collection, query, where, getDocs, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const AddFriend = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const currentUser = FIREBASE_AUTH.currentUser;

  useEffect(() => {
    if (currentUser) {
      fetchFriendsList(); // Load the friends list when the component mounts
    }
  }, [currentUser]);

  const handleSearch = async () => {
    try {
      const usersRef = collection(FIRESTORE_DB, 'users');
      const q = query(usersRef, where('name', '==', searchText));
      const querySnapshot = await getDocs(q);

      const users = querySnapshot.docs
        .filter((doc) => doc.id !== currentUser.uid) // Exclude the current user
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
      const userRef = doc(FIRESTORE_DB, 'users', currentUser.uid);
      await updateDoc(userRef, {
        friends: arrayUnion(friendId),  // Add to current user's friends
      });

      const friendRef = doc(FIRESTORE_DB, 'users', friendId);
      await updateDoc(friendRef, {
        friends: arrayUnion(currentUser.uid),  // Add current user to the friend's list
      });

      alert('Friend added successfully!');
      fetchFriendsList(); // Refresh friends list after adding
    } catch (error) {
      console.error('Error adding friend:', error);
      alert('Error adding friend: ' + error.message);
    }
  };

  const fetchFriendsList = async () => {
    try {
      const userRef = doc(FIRESTORE_DB, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const friends = userDoc.data().friends || [];
        setFriendsList(friends);
      } else {
        console.log('No user found');
      }
    } catch (error) {
      console.error('Error fetching friends list:', error);
      alert('Error fetching friends list: ' + error.message);
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

      <Text style={styles.heading}>Your Friends:</Text>
      {friendsList.length > 0 ? (
        <FlatList
          data={friendsList}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Text style={styles.friendItem}>{item}</Text> // Displaying friend UID, you can extend this to show name
          )}
        />
      ) : (
        <Text>No friends yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  heading: {
    fontSize: 18,
    marginVertical: 10,
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
  friendItem: {
    fontSize: 16,
    padding: 5,
  },
});

export default AddFriend;
