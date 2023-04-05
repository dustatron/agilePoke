import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useDeleteVoters } from "../../hooks";

import React, { useEffect } from "react";
import { UserData } from "../../utils/types";
import { doc } from "firebase/firestore";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useAlertStore } from "../../pages/[id]";

type Props = {
  roomId: string;
  voteData: UserData[];
};

const SettingsMenu = ({ roomId, voteData }: Props) => {
  const { setIsShowingAddUser } = useAlertStore((store) => ({
    setIsShowingAddUser: store.setIsShowingAddUser,
  }));
  const [currentUser, setCurrentUser] = useLocalStorage(
    "mcPoker-user-name",
    {}
  );
  const { deleteAllVoters, deleteCurrentUser } = useDeleteVoters(roomId);

  const handleResetAllUsers = () => {
    deleteAllVoters(voteData);
  };
  const handleResetUser = () => {
    setCurrentUser({});
    setIsShowingAddUser(true);
    deleteCurrentUser(currentUser);
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
          <MenuItem onClick={handleResetAllUsers}>Refresh users</MenuItem>
          <MenuItem onClick={handleResetUser}>Reset your name</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default SettingsMenu;
