import React from "react";
import { Box, Code, Switch } from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import { Td } from "./Table";
import DeleteFeedbackButton from "./DeleteFeedbackButton";
import { updateFeedback } from "@/lib/db";

const FeedbackRow = ({ id, author, text, route, status }) => {
  const isChecked = status === "active";

  const queryClient = useQueryClient();

  const toggleFeedback = async () => {
    await updateFeedback(id, { status: isChecked ? "pending" : "active" });
    await queryClient.invalidateQueries(["feedback"]);
  };

  return (
    <Box as="tr" key={id}>
      <Td fontWeight="medium">{author}</Td>
      <Td>{text}</Td>
      <Td>
        <Code>{route || "/"}</Code>
      </Td>
      <Td>
        <Switch color="green" onChange={toggleFeedback} isChecked={isChecked} />
      </Td>
      <Td>
        <DeleteFeedbackButton feedbackId={id} />
      </Td>
    </Box>
  );
};

export default FeedbackRow;
