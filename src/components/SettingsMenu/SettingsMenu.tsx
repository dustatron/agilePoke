import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
} from "@chakra-ui/react";
import { useDeleteVoters } from "../../hooks";
import { AiOutlineSetting } from "react-icons/ai";

import React from "react";
import { UserData } from "../../utils/types";
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
          rightIcon={<Icon as={AiOutlineSetting} h={6} w={6} />}
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
