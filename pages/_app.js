import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@/lib/auth";
import { Global, css } from "@emotion/react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS>
      <AuthProvider>
        <Global
          styles={css`
            #__next {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
            }
          `}
        />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
