import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../FirebaseConfig';

// Function to add a friend to the user's friend list
export const addFriend = async (currentUserId, friendId) => {
  try {
    // Reference to the current user's document
    const userRef = doc(FIRESTORE_DB, 'users', currentUserId);
    // Update the current user's friends list by adding the friend's UID
    await updateDoc(userRef, {
      friends: arrayUnion(friendId),  // This adds friendId to the 'friends' array
    });
    
    // Optionally, you can do the same on the friend's document to ensure mutual friendship
    const friendRef = doc(FIRESTORE_DB, 'users', friendId);
    await updateDoc(friendRef, {
      friends: arrayUnion(currentUserId),  // This ensures the friend adds the current user
    });
    
    console.log('Friend added successfully');
  } catch (error) {
    throw new Error('Error adding friend: ' + error.message);
  }
};

// Function to get the friends list of a user
export const getFriends = async (userId) => {
  try {
    const userRef = doc(FIRESTORE_DB, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const friendsList = userDoc.data().friends || [];
      return friendsList;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error fetching friends:', error);
    throw error;
  }
};
