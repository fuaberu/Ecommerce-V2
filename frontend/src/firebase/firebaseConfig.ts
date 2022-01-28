import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  appId: process.env.REACT_APP_APP_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  projectId: process.env.REACT_APP_APP_ID,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize storage
const storage = getStorage(app);

export const uploadPics = async (pics: File[]) => {
  const promisses = pics.map((pic, index) => {
    const photoRef = ref(storage, pic.name);
    return uploadBytes(photoRef, pic).then(() => getDownloadURL(photoRef));
  });
  try {
    const urls = await Promise.all(promisses);
    return urls;
  } catch (error) {
    console.log(error);
  }
};
