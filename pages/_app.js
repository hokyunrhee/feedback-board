import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@/lib/auth";
import { Global, css } from "@emotion/react";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
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
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
