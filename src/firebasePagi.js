import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// used this video and stackOverFlow:
//https://www.youtube.com/watch?v=NZKUirTtxcg
export const fetchNextTweets = async (
  batchNumber,
  setBatchNumber,
  setSnap,
  snap
) => {
  // Query the first page of docs

  const sizeQ = query(collection(db, "tweets"));
  let checkSize = await getDocs(sizeQ);
	const usersCol = collection(db, "users");

  let size = checkSize.size;

  if (size < 10) return [];
  const first = query(
    collection(db, "tweets"),
    orderBy("date", "desc"),
    limit(batchNumber * 10)
  );

  const documentSnapshots = await getDocs(first);
	let users = [];
	const allUsers = await getDocs(usersCol);
	allUsers.forEach((doc) => {
		const data = doc.data();
		users.push(data);
	});
  setSnap(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
  let tweets = [];

  documentSnapshots.forEach((doc) => {
    const data = doc.data();
	  data.userName = users.find((user) => user.id === data.id)?.userName;
    tweets.push(data);
  });
  return tweets;
};