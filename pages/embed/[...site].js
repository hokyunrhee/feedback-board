import { useRouter } from "next/router";
import { Box, Text } from "@chakra-ui/react";
import "iframe-resizer/js/iframeResizer.contentWindow";

import Feedback from "@/components/Feedback";
import FeedbackLink from "@/components/FeedbackLink";
import { getAllFeedback, getAllSites, getSite } from "@/lib/db-admin";

const EmbeddedFeedbackPage = ({ initialFeedback, site }) => {
  const router = useRouter();

  return (
    <Box display="flex" flexDirection="column" width="full">
      <FeedbackLink paths={router?.query?.site || []} />
      {initialFeedback?.length ? (
        initialFeedback.map((feedback, index) => (
          <Feedback
            key={feedback.id}
            settings={site?.settings}
            isLast={index === initialFeedback.length - 1}
            {...feedback}
          />
        ))
      ) : (
        <Text>There are no comments for this site.</Text>
      )}
    </Box>
  );
};

export default EmbeddedFeedbackPage;

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      site: [site.id.toString()],
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const [siteId, route] = context.params.site;
  const { feedback } = await getAllFeedback(siteId, route);
  const { site } = await getSite(siteId);

  return {
    props: {
      initialFeedback: feedback,
      site,
    },
    revalidate: 1,
  };
}
