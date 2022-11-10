import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const storage = getStorage();

// Find all the prefixes and items.
const getProfilePic = async (callback, id) => {
  const imgRef = ref(storage, `gs://micro-blogging-b9064.appspot.com/${id}`);
  try {
    return await getDownloadURL(imgRef)
      .then((url) => {
        callback(url);
        // Insert url into an <img> tag to "download"
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
};
const uploadFile = (file, userId, callback) => {
  const storageRef = ref(storage, userId + ".jpg");

  try {
    return uploadBytes(storageRef, file).then((snapshot) => {
      callback(snapshot.bucket + "/" + snapshot.fullPath);
      return snapshot.metadata.fullPath;
    });
  } catch (err) {
    console.log(err);
  }
};

export { getProfilePic, uploadFile };
