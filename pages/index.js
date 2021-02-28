import { useAuth } from "lib/auth";

export default function Home() {
  const { user, signInWithGoogle, signOut } = useAuth();
  return (
    <div>
      {user ? (
        <button onClick={signOut}>SignOut</button>
      ) : (
        <button onClick={signInWithGoogle}>SignInWithGoogle</button>
      )}
    </div>
  );
}
