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

export const uploadPics = (pics: File[]) => {
  let urls: string[] = [];
  pics.forEach(async (pic) => {
    const photoRef = ref(storage, pic.name);
    const url = await getDownloadURL(photoRef);
    urls.push(url);
    uploadBytes(photoRef, pic).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  });
  return urls;
};
