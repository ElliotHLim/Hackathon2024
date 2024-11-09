import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { addFriend, getFriends } from './FriendService';
import { FIREBASE_AUTH } from './FirebaseConfig';

const AddFriend = () => {
  const [friendId, setFriendId] = useState('');
  const [friendsList, setFriendsList] = useState([]);
  const currentUser = FIREBASE_AUTH.currentUser;

  const handleAddFriend = async () => {
    if (!friendId) return alert('Please enter a friend ID');
    try {
      await addFriend(currentUser.uid, friendId);
      alert('Friend added successfully!');
      fetchFriendsList(); // Update friends list after adding
    } catch (error) {
      console.error('Error adding friend:', error);
      alert('Error adding friend: ' + error.message);
    }
  };

  const fetchFriendsList = async () => {
    const friends = await getFriends(currentUser.uid);
    setFriendsList(friends);
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
      {friendsList.map((friend, index) => (
        <Text key={index} style={styles.friendItem}>
          {friend.username} (ID: {friend.uid})
        </Text>
      ))}
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