import { useEffect, useState } from "react";
import { getTweetsFromFireStore } from "../helpers/apiCalls";

export default function useTweets() {
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const subscription = getTweetsFromFireStore(setTweets);
    return () => {
      if (typeof subscription === "function") {
        subscription();
      }
    };
  }, []);

  return {
    tweets,
    setTweets,
  };
}
