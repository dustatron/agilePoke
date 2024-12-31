import { Box, Button, Center, Stack, Text } from "@chakra-ui/react";
import React from "react";
import useMakeRoom from "../../hooks/useMakeRoom";
import { useRouter } from "next/router";

type Props = { refetch: () => void };

const CreateRoom = ({ refetch }: Props) => {
  const router = useRouter();
  const { id: roomIdUrl } = router.query;
  const { mutate: addRoom } = useMakeRoom({ roomId: roomIdUrl as string });
  return (
    <Center>
      <Stack>
        <Box>
          <Text
            as="h1"
            textAlign="center"
            fontSize="2xl"
            fontWeight="extrabold"
          >
            No Room Data
          </Text>
        </Box>
        <Box>
          <Text align="center">
            The room{" "}
            <Text
              fontWeight="black"
              display="inline"
              textTransform="capitalize"
            >
              {roomIdUrl}{" "}
            </Text>
            does not exist. would you like to created it?
          </Text>

          <Stack p="5">
            <Button
              onClick={() => {
                addRoom(roomIdUrl as string);
                refetch();
              }}
              colorScheme="green"
            >
              Make Room
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Center>
  );
};

export default CreateRoom;
