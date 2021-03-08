import { Button, Stack } from "@chakra-ui/react";
import { useAuth } from "@/lib/auth";

const LoginButtons = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <Stack isInline>
      <Button
        onClick={signInWithGoogle}
        backgroundColor="white"
        color="gray.900"
        variant="outline"
        fontWeight="medium"
        leftIcon="google"
        mt={4}
        _hover={{ bg: "gray.100" }}
        _active={{
          bg: "gray.100",
          transform: "scale(0.95)",
        }}
      >
        Continue with Google
      </Button>
    </Stack>
  );
};

export default LoginButtons;
