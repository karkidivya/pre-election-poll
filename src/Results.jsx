import { useEffect, useState } from "react";
import { db, collection, getDocs } from "./firebase";

export default function Results() {
  const [results, setResults] = useState({});

  useEffect(() => {
    const fetchVotes = async () => {
      const snapshot = await getDocs(collection(db, "votes"));
      const counts = {};
      snapshot.forEach((doc) => {
        const candidate = doc.data().candidate;
        counts[candidate] = (counts[candidate] || 0) + 1;
      });
      setResults(counts);
    };
    fetchVotes();
  }, []);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold mb-4">Election Results</h1>
      {Object.entries(results).map(([candidate, votes]) => (
        <p key={candidate} className="text-lg">
          {candidate}: {votes} votes
        </p>
      ))}
    </div>
  );
}