import { useAuth } from "lib/auth";
import { Flex } from "@chakra-ui/react";

import { getAllFeedback, getSite } from "@/lib/db-admin";

export default function Home({ allFeedback, site }) {
  const { user, signInWithGoogle, signOut } = useAuth();
  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    ></Flex>
  );
}

export async function getStaticProps(context) {
  const SITE_ID = "1234";

  const { feedback } = await getAllFeedback(SITE_ID);
  const { site } = await getSite(SITE_ID);
  return {
    props: {
      allFeedback: feedback,
      site,
    },
    revalidate: 1,
  };
}
