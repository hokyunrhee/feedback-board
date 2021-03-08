import React from "react";
import NextLink from "next/link";
import { Link, Flex } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex mb={8} mt={24} justify="center">
      <NextLink href="/" passHref>
        <Link fontSize="sm" mr={4} fontWeight="medium" color="gray.500">
          Home
        </Link>
      </NextLink>
    </Flex>
  );
};

export default Footer;
