import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "lib/auth";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
