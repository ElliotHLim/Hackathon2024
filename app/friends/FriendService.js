import { doc, setDoc, updateDoc, arrayUnion, getDoc, Timestamp } from 'firebase/firestore';
import { FIREBASE_FIRESTORE } from './FirebaseConfig';

// Add a new user to Firestore
export const createUserProfile = async (uid, username) => {
  const userDoc = doc(FIREBASE_FIRESTORE, 'users', uid);
  await setDoc(userDoc, {
    username,
    created: Timestamp.now(),
    friends: [],
  });
};

// Add a friend
export const addFriend = async (userId, friendId) => {
  const userDocRef = doc(FIREBASE_FIRESTORE, 'users', userId);
  const friendDocRef = doc(FIREBASE_FIRESTORE, 'users', friendId);

  // Get friend's data to store in the user's friends list
  const friendDoc = await getDoc(friendDocRef);
  if (friendDoc.exists()) {
    const friendData = friendDoc.data();
    await updateDoc(userDocRef, {
      friends: arrayUnion({ uid: friendId, username: friendData.username }),
    });
  }
};

// Get a user's friends
export const getFriends = async (userId) => {
  const userDoc = await getDoc(doc(FIREBASE_FIRESTORE, 'users', userId));
  return userDoc.exists() ? userDoc.data().friends : [];
};