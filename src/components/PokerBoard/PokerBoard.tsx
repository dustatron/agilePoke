import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Heading,
} from "@chakra-ui/react"
import React, { useCallback, useEffect, useState } from "react"
import { Room, UserData } from "../../utils/types"
import { doc, updateDoc } from "firebase/firestore"

import BasicForm from "../BasicForm"
import Card from "../Card"
import User from "../User"
import { getFirestore } from "../../utils/firebase"
import { useUpdateDoc } from "../../hooks"
import { v4 } from "uuid"

type Props = {
  roomData: Room
  roomId: string
}

const PokerBoard = ({ roomData, roomId }: Props) => {
  const [currentUser, setCurrentUser] = useState<UserData>()

  const firebaseApp = getFirestore()
  const thisDocRef = doc(firebaseApp, "rooms", roomId)
  const updateRoomData = useUpdateDoc(thisDocRef)

  const options = [1, 2, 3, 5, 8, 13, 21, 34]
  const isBrowser = typeof window !== "undefined"

  const handleAddUser = async (currentUser: string) => {
    const newUser: UserData = {
      name: currentUser,
      vote: 0,
      id: v4(),
    }
    setCurrentUser(newUser)
    if (isBrowser) {
      window.localStorage.setItem("agile-poker", JSON.stringify(newUser))
    }
    updateRoomData({
      users: [...roomData.users, newUser],
    })
  }

  const handleSelection = async (vote: number) => {
    const updateUserData: UserData = { ...currentUser!, vote }
    setCurrentUser(updateUserData)

    const newUserData = [...roomData.users]
    const currentUserIndex = newUserData.findIndex(
      (user: UserData) => user.id === updateUserData.id
    )
    newUserData[currentUserIndex].vote = vote

    updateRoomData({
      users: newUserData,
    })
  }

  const handleReset = () => {
    const data = {
      isVoting: true,
      users: roomData.users.map((user) => ({ ...user, vote: 0 })),
    }
    updateRoomData(data)
  }

  const handleShow = () => {
    updateRoomData({
      isVoting: !roomData.isVoting,
    })
  }

  const updateUserList = async (user: UserData) => {
    updateRoomData({
      users: [...roomData.users, user],
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoUpdateUserList = useCallback(
    (user: UserData) => updateUserList(user),
    [currentUser]
  )

  useEffect(() => {
    if (isBrowser) {
      const fromLocalStorage = window.localStorage.getItem("agile-poker")
      setCurrentUser(fromLocalStorage && JSON.parse(fromLocalStorage))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const isUserInRoomData = !!roomData.users.find(
      (user) => user?.id === currentUser?.id
    )
    if (!isUserInRoomData && currentUser) {
      memoUpdateUserList(currentUser)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  return (
    <Container size="lg" maxW="4xl">
      <Heading textAlign="center">Room : {roomData.name}</Heading>
      {!currentUser && (
        <BasicForm
          title="Enter Name"
          placeholder="Name"
          buttonCopy="Go"
          onSubmit={(name: string) => handleAddUser(name)}
        />
      )}
      {currentUser && (
        <>
          <Box h="60vh" w="100%">
            <Center h="10" paddingTop={4}>
              <Button onClick={handleShow}>
                {roomData.isVoting ? "Show" : "Hide"}
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleReset}
                isDisabled={roomData.isVoting}
              >
                Reset Vote
              </Button>
            </Center>
            <HStack spacing="10px" justify="center" paddingTop={4}>
              {roomData.users.map((user) => (
                <User
                  key={user?.id}
                  isVoting={roomData.isVoting}
                  name={user?.name}
                  vote={user?.vote}
                  isCurrentUser={user?.id === currentUser.id}
                />
              ))}
            </HStack>
          </Box>
          <HStack spacing="5px" justify="center">
            {options.map((num) => (
              <Card
                key={num}
                number={num}
                isVoting={roomData.isVoting}
                select={handleSelection}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  )
}

export default PokerBoard
