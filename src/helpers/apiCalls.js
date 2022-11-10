import * as config from "./config";
import {
  db,
  collection,
  getDocs,
  setDoc,
  doc,
  addDoc,
  onSnapshot,
  query,
  where,
  getDoc,
} from "../firebase";
import { limit, orderBy } from "firebase/firestore";

export const getTweets = async () => {
  const url = config.serverResourceUrl;
  const response = await fetch(url);
  const data = await response.json();
  return data.tweets;
};

export const postTweet = async (tweet, setError) => {
  const url = config.serverResourceUrl;
  try {
    const response = await fetch(url, {
      method: config.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tweet),
    });
    const data = await response.json();
    return data.tweet;
  } catch (err) {
    setError(err.message);
  }
};

export const postTweetToFireStore = async (tweet, setError) => {
  try {
    const docRef = await addDoc(collection(db, "tweets"), tweet);

    return docRef.id;
  } catch (err) {
    setError(err.message);
  }
};

export const getTweetsFromFireStore = async (callback) => {
  const col = collection(db, "tweets");
  const usersCol = collection(db, "users");
  const tweetsQ = query(col, limit(10), orderBy("date", "desc"));

  const tweetListener = onSnapshot(tweetsQ, async (querySnapshot) => {
    let users = [];
    const allUsers = await getDocs(usersCol);
    allUsers.forEach((doc) => {
      const data = doc.data();
      users.push(data);
    });
    let tweets = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      data.userName = users.find((user) => user.id === data.id)?.userName;
      tweets.push(data);
    });
    callback(tweets);
  });

  return tweetListener;
};

export const updateUserName = async (userId, name, callback) => {
  try {
    let user = {
      id: userId,
      userName: name,
    };
    const ref = doc(db, "users", userId);
    const docRef = await setDoc(ref, user);
    callback(name);
  } catch (err) {
    console.log(err);
  }
};

export const getUserName = async (userId, callback) => {
  try {
    const userRef = collection(db, "users");

    const queryRef = query(userRef, where("id", "==", userId));

    const userData = await getDocs(queryRef);
    if (userData.docs.length === 0) {
      updateUserName(userId, userId, callback);
    }

    userData.forEach((doc) => {
      callback(doc.data().userName);
    });
  } catch (err) {
    console.log(err);
  }
};
export const addImageRefToUser = async (userId, imgId) => {
  try {
    const imgRef = {
      userId: userId,
      imgId: imgId,
    };
    const docRef = await setDoc(doc(db, "imgs", userId), imgRef);

    /* return docRef.id; */
  } catch (err) {
    console.log(err);
  }
};

export const getImgRef = async (userId) => {
  try {
    const imgRef = collection(db, "imgs");

    const q = query(imgRef, where("userId", "==", userId));

    const imgData = await getDocs(q);
    let url = "";
    imgData.forEach((doc) => {
      url = doc.data().imgId;
    });
    return url;
  } catch (err) {
    console.log(err);
  }
};
