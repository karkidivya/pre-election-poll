import { useState, useEffect } from "react";
import Auth from "./Auth";
import Voting from "./Voting";
import Results from "./Results";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [user, setUser] = useState(null);

  // Use useEffect to properly manage authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {!user ? <Auth /> : <>
        <Voting />
        <Results />
      </>}
    </div>
  );
}