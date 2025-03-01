import { useState } from "react";
import { db, addDoc, collection } from "./firebase";

const submitVote = async (candidateId) => {
  try {
    await addDoc(collection(db, "votes"), {
      candidate: candidateId,
      timestamp: new Date().toISOString(),
    });
    console.log("Vote submitted successfully!");
  } catch (error) {
    console.error("Error submitting vote:", error);
  }
};

export default function Voting() {
  const candidates = ["Candidate A", "Candidate B", "Candidate C"];
  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold mb-4">Vote for Your Candidate</h1>
      {candidates.map((candidate) => (
        <button
          key={candidate}
          onClick={() => submitVote(candidate)}
          className="block w-full py-2 my-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
        >
          {candidate}
        </button>
      ))}
    </div>
  );
}