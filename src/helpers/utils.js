import localforage from "localforage";

/* get and set info */
export const loadTweets = async (callback) =>
  (async () => {
    try {
      localforage.getItem("localUserName").then((localUserName) => {
        if (localUserName && Object.keys(localUserName).length)
          callback(localUserName);
      });
    } catch (err) {
      console.log(err);
    }
  })();

export const storeTweets = (name) => {
  if (Object.keys(name).length) {
    (async () => {
      localforage.setItem("localUserName", name).catch((err) => {
        console.error(err);
      });
    })();
  }
};

/* adding to local storage */
export const addTweet = (tweet) => {
  localforage
    .setItem(tweet.id, tweet)
    .then(function (value) {
      /* Do other things once the value has been saved. */
      console.log(value);
    })
    .catch(function (err) {
      /* This code runs if there were any errors */
      console.log(err);
    });
};

export const setDate = () => {
  let dateString = new Date();
  return dateString.toISOString();
};
