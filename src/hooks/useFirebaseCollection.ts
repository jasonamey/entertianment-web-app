import React, {useState} from "react";
import {db} from "../firebase";
import {collection, query, getDocs, where} from "firebase/firestore";
import {MediaContent} from "../types/MediaContent";

const useFirebaseCollection = (contentField: string, contentValue: string) => {
  const [data, setData] = useState([] as MediaContent[]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      const q = await query(
        collection(db, "content"),
        where(contentField, "==", contentValue)
      );
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

export default useFirebaseCollection;
