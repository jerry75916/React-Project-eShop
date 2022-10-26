import { doc, getDoc } from "firebase/firestore";
import { sotreDb } from "../../pages/firebase/config";

export const fetchById = async (collectionName, documentID) => {
  let document = null;
  const docRef = doc(sotreDb, collectionName, documentID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    document = { id: documentID, ...docSnap.data() };
  }
  return  document ;
};
