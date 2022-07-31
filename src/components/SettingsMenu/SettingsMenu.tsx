import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from "@chakra-ui/react"

import React from "react"
import { UserData } from "../../utils/types"
import { doc } from "firebase/firestore"
import { getFirestore } from "../../utils/firebase"
import { useUpdateDoc } from "../../hooks"

type Props = {
  roomId: string
  users: UserData[]
  currentUser: UserData
  setCurrentUser: (user?: UserData) => void
}

const SettingsMenu = ({
  roomId,
  users,
  currentUser,
  setCurrentUser,
}: Props) => {
  const firebaseApp = getFirestore()
  const thisDocRef = doc(firebaseApp, "rooms", roomId)
  const updateRoomData = useUpdateDoc(thisDocRef)

  const handleResetAllUsers = () => {
    updateRoomData({ users: [] })
    setCurrentUser(undefined)
  }
  const handleResetUser = () => {
    const newUserList = users.filter((user) => user.id !== currentUser!.id)
    updateRoomData({ users: newUserList })
    setCurrentUser()
  }
  return (
    <Box display="flex" justifyContent="right">
      <Menu>
        <MenuButton as={Button} rightIcon={"⚙️"}>
          Reset
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleResetUser}>Reset User Name</MenuItem>
          <MenuItem onClick={handleResetAllUsers}>Remove all users</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default SettingsMenu
