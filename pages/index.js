import { useAuth } from "lib/auth";
import { Button, Flex } from "@chakra-ui/react";
import { createSite } from "@/lib/db";

export default function Home() {
  const { user, signInWithGoogle, signOut } = useAuth();
  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    >
      {user ? (
        <Button as="a" href="/dashboard">
          View Dashboard
        </Button>
      ) : (
        <Button mt={4} size="sm" onClick={() => createSite({ test: 1 })}>
          Sign In
        </Button>
      )}
    </Flex>
  );
}
