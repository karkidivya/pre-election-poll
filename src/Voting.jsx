import { useState } from "react";
import { auth, db, addDoc, collection, getDocs, query, where } from "./firebase";

// Hash email for privacy before storing in Firestore
const hashEmail = async (email) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(email);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer)).map(byte => byte.toString(16).padStart(2, '0')).join('');
};

const submitVote = async (candidateId) => {
  try {
    const user = auth.currentUser;
    if (!user) return;
    const hashedEmail = await hashEmail(user.email);

    // Check if user has already voted
    const votesRef = collection(db, "votes");
    const q = query(votesRef, where("userId", "==", hashedEmail));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      console.log("User has already voted!");
      return;
    }

    // Store only hashed email, not the actual email
    await addDoc(votesRef, {
      userId: hashedEmail,
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