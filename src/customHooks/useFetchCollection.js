import { useState ,useEffect} from "react";
import { collection, onSnapshot,query,orderBy,} from "firebase/firestore";
import {sotreDb} from "../pages/firebase/config"
import { toast } from "react-toastify";
const useFetchCollection= (collectionName)=>{
    const [data, setData] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const getCollection = () => {
        try {
          setisLoading(true);
          const docRef = collection(sotreDb, collectionName);
          const q = query(docRef, orderBy("createdAt", "desc"));
         onSnapshot(q, (Snapshot) => {
          const allData = Snapshot.docs.map((doc) => ({ //pototype 裡面有個docs
            id: doc.id,
            ...doc.data(),
          }));
           setData(allData);
           setisLoading(false);          
         });
        } catch (e) {
          setisLoading(false);
          toast.error(e.message);
        }
      };
      useEffect(() => {
        getCollection();
      }, []);
  return {data,isLoading};
}
export default useFetchCollection;