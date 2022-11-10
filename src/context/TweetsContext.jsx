import React, { createContext, useState } from "react";
import { postTweetToFireStore } from "../helpers/apiCalls";
import useTweets from "../hooks/useTweets";

export const TweetsContext = createContext();

/* using context for milestone 4 */
export const TweetsContextProvider = (props) => {
  const { tweets, setTweets } = useTweets();
  const [isLoading, setIsLoading] = useState(false);

  const newTweet = async (tweet, setError, setIsLoadingLocal) => {
    setIsLoadingLocal(true);
    await postTweetToFireStore(tweet, setError);
    setIsLoadingLocal(false);
  };

  return (
    <TweetsContext.Provider
      value={{
        newTweet: newTweet,
        tweets: tweets,
        setTweets: setTweets,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
      }}
    >
      {props.children}
    </TweetsContext.Provider>
  );
};
