import * as React from "react";
import {db} from "../firebase";
import {collection, query, getDocs, where} from "firebase/firestore";
import {MediaContent} from "../types/MediaContent";

const useFirebaseData = () => {
  const [data, setData] = React.useState([] as MediaContent[]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      const q = await query(collection(db, "content"));
      const querySnapshot = await getDocs(q);
      let filmData = [] as any;
      querySnapshot.forEach((doc) => {
        let film = {id: doc.id, ...doc.data()};
        filmData.push(film);
      });
      if (isMounted) {
        setData((prev) => filmData);
        setIsLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);
  return [isLoading, data];
};

export default useFirebaseData;
