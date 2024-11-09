import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { addFriend, getFriends } from './FriendService';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../FirebaseConfig';  // Adjust the import path

const AddFriend = () => {
  const [friendId, setFriendId] = useState('');
  const [friendsList, setFriendsList] = useState([]);
  const currentUser = FIREBASE_AUTH.currentUser;

  useEffect(() => {
    if (currentUser) {
      fetchFriendsList(); // Load the friends list when the component mounts
    }
  }, [currentUser]);

  const handleAddFriend = async () => {
    if (!friendId) return alert('Please enter a friend ID');
    try {
      await addFriend(currentUser.uid, friendId);
      alert('Friend added successfully!');
      fetchFriendsList(); // Refresh the friends list after adding
    } catch (error) {
      console.error('Error adding friend:', error);
      alert('Error adding friend: ' + error.message);
    }
  };

  const fetchFriendsList = async () => {
    try {
      const friends = await getFriends(currentUser.uid);
      setFriendsList(friends);
    } catch (error) {
      console.error('Error fetching friends list:', error);
      alert('Error fetching friends list: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Friend's UID"
        value={friendId}
        onChangeText={setFriendId}
        style={styles.input}
      />
      <Button title="Add Friend" onPress={handleAddFriend} />

      <Text style={styles.heading}>Friends List:</Text>
      {friendsList.length > 0 ? (
        friendsList.map((friend, index) => (
          <Text key={index} style={styles.friendItem}>
            {friend}  {/* Assuming friend is the UID, you can extend this with more user info */}
          </Text>
        ))
      ) : (
        <Text>No friends yet.</Text>
      )}

      <Button title="Refresh Friends List" onPress={fetchFriendsList} />
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
  friendItem: {
    fontSize: 16,
    padding: 5,
  },
});

export default AddFriend;
