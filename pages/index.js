import { Box, Button, Flex, Text, Link } from "@chakra-ui/react";
import Feedback from "@/components/Feedback";
import FeedbackLink from "@/components/FeedbackLink";
import LoginButtons from "@/components/LoginButtons";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth";
import { getAllFeedback, getSite } from "@/lib/db-admin";

const SITE_ID = "yjIaQj1mKtVKqUnU9tb3";

export default function Home({ allFeedback, site }) {
  const { user } = useAuth();

  return (
    <>
      <Box bg="gray.100" py={16}>
        <Flex as="main" direction="column" maxW="700px" margin="0 auto">
          <Text fontSize="5xl">👋</Text>
          <Text mb={4} fontSize="lg" py={4}>
            <Text as="span" fontWeight="bold" display="inline">
              Feedback Board
            </Text>
            {"는 react2025 프로젝트를 일부 수정하여 만들었습니다. "}
            <Link
              href="https://react2025.com"
              isExternal
              textDecoration="underline"
            >
              React 2025
            </Link>
            <br />
            {`정적 사이트에 댓글을 손쉽게 추가하고 관리할 수 있는 기능을 제공합니다.`}
          </Text>
          {user ? (
            <Button
              as="a"
              href="/sites"
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              mt={4}
              maxW="200px"
              _hover={{ bg: "gray.700" }}
              _active={{
                bg: "gray.800",
                transform: "scale(0.95)",
              }}
            >
              View Dashboard
            </Button>
          ) : (
            <LoginButtons />
          )}
        </Flex>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
        mt={8}
      >
        <FeedbackLink paths={[SITE_ID]} />
        {allFeedback.map((feedback, index) => (
          <Feedback
            key={feedback.id}
            settings={site?.settings}
            isLast={index === allFeedback.length - 1}
            {...feedback}
          />
        ))}
      </Box>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
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
