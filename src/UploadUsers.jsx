// src/components/UploadUsers.jsx
import { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";  // adjust path as per your file structure
import { Users } from "./utils/localStorage";  // adjust path as needed

const UploadUsers = () => {
  useEffect(() => {
    const uploadData = async () => {
      if (!Users || Users.length === 0) {
        console.log("No users to upload!");
        return;
      }

      for (const user of Users) {
        if (!user.uid) {
          console.warn("Skipping user without id:", user);
          continue;  // Skip users without an id
        }
        try {
          const userRef = doc(db, "Users", String(user.uid));
          await setDoc(userRef, user);
          console.log(`✅ Uploaded user: ${user.firstName || user.email || user.id}`);
        } catch (error) {
          console.error("❌ Error uploading user:", user, error);
        }
      }
    };


    uploadData();
  }, []);

  return <div>Uploading users to Firebase... Check your console 🧡</div>;
};

export default UploadUsers;
