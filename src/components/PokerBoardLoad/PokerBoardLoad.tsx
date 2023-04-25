import {
  Container,
  Fade,
  Skeleton,
  SlideFade,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

const PokerBoardLoad = () => {
  return (
    <Fade in={true}>
      <Container
        size="2xl"
        maxW={["2xl", "4xl"]}
        bg="white"
        border="1px"
        borderColor="#d4d4d4"
        padding="5"
        borderRadius="xl"
        boxShadow="xl"
        h="500px"
        backgroundColor={"#fafafa"}
      >
        <Stack spacing="5">
          <Skeleton height="30px" startColor="blue.100" endColor="orange.100" />
          <Stack direction="row" justifyContent="center" spacing={20}>
            <Skeleton height="50px" width="100px" />
            <Skeleton height="50px" width="100px" />
          </Stack>
          <Stack direction="row" justifyContent="center" spacing={5}>
            <Skeleton height="150px" width="150px" />
            <Skeleton height="150px" width="150px" />
            <Skeleton height="150px" width="150px" />
          </Stack>
          <Text textAlign="center" as="h2" fontSize="xl">
            Loading...
          </Text>
          <Stack direction="row" justifyContent="center" spacing={5} pt={5}>
            <Skeleton height="90px" width="80px" />
            <Skeleton height="90px" width="80px" />
            <Skeleton height="90px" width="80px" />
            <Skeleton height="90px" width="80px" />
            <Skeleton height="90px" width="80px" />
            <Skeleton height="90px" width="80px" />
            <Skeleton height="90px" width="80px" />
            <Skeleton height="90px" width="80px" />
          </Stack>
        </Stack>
      </Container>
    </Fade>
  );
};

export default PokerBoardLoad;
