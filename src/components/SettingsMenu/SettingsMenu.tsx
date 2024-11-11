import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { useDeleteVoters } from "../../hooks";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDriveFileRenameOutline } from "react-icons/md";

import { IoReload } from "react-icons/io5";

import React from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useAlertStore } from "../../pages/[id]";
import HotkeysModal from "../HotkeysModal";
import { PokerUserRecord } from "pocketTypes";

type Props = {
  roomId: string;
  voteData: PokerUserRecord[];
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
    <Box display="flex" justifyContent="right">
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<Icon as={GiHamburgerMenu} h={6} w={6} color="black" />}
          colorScheme="twitter"
          variant="ghost"
        />
        <MenuList>
          <MenuItem onClick={handleResetAllUsers}>
            <Icon as={IoReload} h={4} w={4} mr="3" /> Refresh users
          </MenuItem>
          <MenuItem onClick={handleResetUser}>
            {" "}
            <Icon as={MdDriveFileRenameOutline} h={4} w={4} mr="3" /> Edit your
            name
          </MenuItem>
          <HotkeysModal />
        </MenuList>
      </Menu>
    </Box>
  );
};

export default SettingsMenu;
