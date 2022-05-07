import data from "./data.json";
import {db} from "../firebase";
import {addDoc, collection, query, getDocs} from "firebase/firestore";
import {getStorage, ref, uploadBytes} from "firebase/storage";
import {trending} from "./final-data/final-trending";
import {movies} from "./final-data/final-movies";
import {tv} from "./final-data/final-tv-series";

// export const func = async () => {
//   const filmRef = collection(db, "films");
//   const tvRef = collection(db, "shows");
//   const films = data.filter((item) => item.category === "Movie");
//   const televisionShows = data.filter((item) => item.category === "TV Series");
//   await televisionShows.forEach((show) => addDoc(tvRef, show));
// };

// const colRef = collection(db, "movies");

// export const q = query(collection(db, "movies"));

// export const seedTrending = async () => {
//   const trendingRef = collection(db, "trending");
//   await trending.forEach((trend) => addDoc(trendingRef, trend));
// };

const colRef = collection(db, "content");

// export const q = query(collection(db, "content"));

export const seedContent = async () => {
  let content = [...movies, ...tv].sort((a, b) => b.year - a.year);

  const contentRef = collection(db, "content");
  await content.forEach((trend) => addDoc(contentRef, trend));
};

export const seeding = () => {
  let index = 0;
  const interval = setInterval(async () => {
    const filmRef = collection(db, "films");
    console.log(data[index]);
    // await addDoc(filmRef, {title: "bad movie", rating: "R"})
    await addDoc(filmRef, data[index]);
    index += 1;
    // when we reach the end of the seedData array, remove the setInterval method
    // if (index === newSeedData.length) clearInterval(interval);
    if (data.length === index) {
      clearInterval(interval);
    }
  }, 2000);
};

export const storageTest = () => {
  const storage = getStorage();

  // Create a reference to 'mountains.jpg'
  const mountainsRef = ref(storage, "mountains.jpg");

  // Create a reference to 'images/mountains.jpg'
  const mountainImagesRef = ref(storage, "imagesHello/mountains.jpg");
  console.log(mountainImagesRef);
  const promise = fs.promises.readFile(path.join(__dirname + "/large.jpg"));
  // Promise.resolve(promise).then((data) => {
  //   uploadBytes(mountainImagesRef, data).then((snapshot) =>
  //     console.log(snapshot)
  //   );
  // });
};
