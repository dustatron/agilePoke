import { Container, SlideFade, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import BasicForm from "../BasicForm";
import useCreateUserPB from "../../hooks/useCreateUserPB";
import { useLocalStorage } from "../../hooks";
import { PokerUserRecord } from "pocketTypes";
import { LocalStorageKeys } from "../../utils/types";

type Props = {
  roomId: string;
  setIsShowing: (value: boolean) => void;
};

const CreateUser = ({ roomId, setIsShowing }: Props) => {
  const [localUserData, setLocalUserData] = useLocalStorage<PokerUserRecord>(
    LocalStorageKeys.User,
    null
  );

  // create User
  const {
    mutate: createUser,
    data: currentUserDataFromCall,
    status: creatingUserStatus,
  } = useCreateUserPB({
    userName: localUserData?.name,
    pokerRoom: roomId,
  });

  const handleAddUser = (name: string) => {
    if (name) {
      createUser({ userName: name, pokerRoom: roomId });
    }
  };

  useEffect(() => {
    if (currentUserDataFromCall?.id) {
      setLocalUserData(currentUserDataFromCall);
      setIsShowing(false);
    }
  }, [currentUserDataFromCall, setIsShowing, setLocalUserData]);

  return (
    <SlideFade in={true} offsetY="100px">
      <Container padding="2">
        <Text as="h2" textAlign="center" fontSize="xl" fontWeight="light">
          Provide your name
        </Text>
        <BasicForm
          title="Display name"
          placeholder="Name"
          buttonCopy="Go"
          isLoading={creatingUserStatus === "loading"}
          onSubmit={(name: string) => handleAddUser(name)}
        />
      </Container>
    </SlideFade>
  );
};

export default CreateUser;
