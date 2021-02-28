import { useAuth } from "@/lib/auth";
import { Button } from "@chakra-ui/react";

export default function Home() {
  const { user, signInWithGoogle, signOut } = useAuth();
  return (
    <div>
      {user ? (
        <Button onClick={signOut}>SignOut</Button>
      ) : (
        <Button onClick={signInWithGoogle}>SignInWithGoogle</Button>
      )}
    </div>
  );
}
