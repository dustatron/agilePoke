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
import { v4 } from "uuid"

type Props = {
  roomData: Room
  roomId: string
}

const PokerBoard = ({ roomData, roomId }: Props) => {
  const [currentUser, setCurrentUser] = useState<UserData>()

  const firebaseApp = getFirestore()
  const thisDocRef = doc(firebaseApp, "rooms", roomId)

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
    try {
      await updateDoc(thisDocRef, {
        users: [...roomData.users, newUser],
      })
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  const handleSelection = async (vote: number) => {
    const updateUserData: UserData = { ...currentUser!, vote }
    setCurrentUser(updateUserData)

    const newUserData = [...roomData.users]
    const currentUserIndex = newUserData.findIndex(
      (user: UserData) => user.id === updateUserData.id
    )
    newUserData[currentUserIndex].vote = vote
    console.log(newUserData)

    try {
      await updateDoc(thisDocRef, {
        users: newUserData,
      })
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  const handleReset = async () => {
    try {
      await updateDoc(thisDocRef, {
        isVoting: true,
        users: roomData.users.map((user) => ({ ...user, vote: 0 })),
      })
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  const handleShow = async () => {
    await updateDoc(thisDocRef, {
      isVoting: !roomData.isVoting,
    })
  }

  const updateUserList = async () => {
    if (currentUser) {
      try {
        console.log("currentUser", currentUser)

        await updateDoc(thisDocRef, {
          users: [...roomData.users, currentUser],
        })
      } catch (e) {
        console.error("Error adding document: ", e)
      }
    }
  }

  const memoUpdateUserList = useCallback(() => updateUserList(), [currentUser])

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
    console.log("isUserInRoomData", isUserInRoomData)
    if (!isUserInRoomData) {
      console.log("settin")
      memoUpdateUserList()
    }
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
