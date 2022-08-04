import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { useDeleteVoters, useUpdateDoc } from "../../hooks"

import React from "react"
import { UserData } from "../../utils/types"
import { doc } from "firebase/firestore"
import { getFirestore } from "../../utils/firebase"

type Props = {
  roomId: string
  voteData: UserData[]
  currentUser: UserData
  setCurrentUser: (user?: UserData) => void
}

const SettingsMenu = ({
  roomId,
  voteData,
  currentUser,
  setCurrentUser,
}: Props) => {
  const { deleteAllVoters, deleteCurrentUser } = useDeleteVoters(roomId)

  const handleResetAllUsers = () => {
    deleteAllVoters(voteData)
    setCurrentUser()
  }
  const handleResetUser = () => {
    deleteCurrentUser(currentUser)
    setCurrentUser()
  }
  return (
    <Box display="flex" justifyContent="right">
      <Menu>
        <MenuButton as={Button} rightIcon={"⚙️"}>
          Settings
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleResetUser}>Reset your name</MenuItem>
          <MenuItem onClick={handleResetAllUsers}>Remove all users</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default SettingsMenu
