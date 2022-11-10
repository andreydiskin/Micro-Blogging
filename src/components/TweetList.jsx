import React, { useContext, useRef, useEffect, useState } from "react";
import Tweet from "./Tweet/Tweet";
import Col from "react-bootstrap/Row";
import { TweetsContext } from "../context/TweetsContext";
import { fetchNextTweets } from "../firebasePagi";

export default function TweetList() {
  const [batchNumber, setBatchNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { tweets, setTweets } = useContext(TweetsContext);
  const [snap, setSnap] = useState(null);
  const observer = useRef();
  const lastTweetNode = useRef();

  useEffect(() => {
    if (!hasMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        if (tweets.length > 0) {
          let newTweets = await fetchNextTweets(
            batchNumber,
            setBatchNumber,
            setSnap,
            snap
          );
          setBatchNumber(batchNumber + 1);
          if (newTweets.length === 0) {
            setHasMore(false);
            return;
          }

          setTweets(newTweets);
        }
      }
    });
    if (lastTweetNode.current) observer.current.observe(lastTweetNode.current);
  }, [tweets]);

  return (
    <>
      {tweets.map((tweet, index) =>
        index + 1 === tweets.length ? (
          <Col ref={lastTweetNode} key={tweet.index}>
            <Tweet tweet={tweet} />
          </Col>
        ) : (
          <Col key={tweet.index}>
            <Tweet tweet={tweet} />
          </Col>
        )
      )}
    </>
  );
}
