import { auth, provider, signInWithPopup } from "./firebase";

const signIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const email = result.user.email;
    if (email.endsWith("@pcampus.edu.np")) {
      console.log("Access granted: ", email);
    } else {
      console.log("Access denied: Invalid email");
      auth.signOut();
    }
  } catch (error) {
    console.error("Error signing in: ", error);
  }
};

export default function Auth() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <button onClick={signIn} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md">
        Sign in with Google
      </button>
    </div>
  );
}