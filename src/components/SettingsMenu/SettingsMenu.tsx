import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useDeleteVoters, useUpdateDoc } from "../../hooks";

import React from "react";
import { UserData } from "../../utils/types";
import { doc } from "firebase/firestore";
import useLocalStorage from "../../hooks/useLocalStorage";

type Props = {
  roomId: string;
  voteData: UserData[];
};

const SettingsMenu = ({ roomId, voteData }: Props) => {
  const [currentUser, setCurrentUser] = useLocalStorage(
    "mcPoker-user-name",
    {}
  );
  const { deleteAllVoters, deleteCurrentUser } = useDeleteVoters(roomId);

  const handleResetAllUsers = () => {
    deleteAllVoters(voteData);
    setCurrentUser();
  };
  const handleResetUser = () => {
    deleteCurrentUser(currentUser);
    setCurrentUser();
  };
  return (
    <Box display="flex" justifyContent="right" marginTop="3">
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={"⚙️"}
          colorScheme="twitter"
          variant="outline"
        >
          Settings
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleResetUser}>Reset your name</MenuItem>
          <MenuItem onClick={handleResetAllUsers}>Remove all users</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default SettingsMenu;
