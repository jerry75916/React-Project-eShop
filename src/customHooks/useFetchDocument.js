import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { sotreDb } from "../pages/firebase/config";

const useFetchDocument = (collectionName, documentID) => {
  const [Loading, setLoading] = useState(true);
  const [document, setdocument] = useState(null);
  const getDocument = async () => {
    const docRef = doc(sotreDb, collectionName, documentID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setdocument({ id: documentID, ...docSnap.data() });
      setLoading(false);
    } else {
      toast.error("Document not found!");
    }
  };
  useEffect(() => {
    getDocument();
  }, []);
  return { document, Loading };
};

export default useFetchDocument;
