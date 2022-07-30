import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Heading,
  Select,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"

import BasicForm from "../BasicForm"
import Card from "../Card"
import User from "../User"

type User = {
  name: string
  vote: number | null
  id: string
}
type Props = {
  roomName?: string
}

const userListTemp: User[] = [
  { name: "Jerry", vote: 2, id: "123" },
  { name: "Jan", vote: 3, id: "345" },
]

const PokerBoard = ({ roomName }: Props) => {
  const [userList, setUserList] = useState<User[]>(userListTemp)
  const [userName, setUserName] = useState("")
  const [isShowingForm, setIsShowingForm] = useState(true)
  const [isVoting, setVoting] = useState(true)

  const options = [1, 2, 3, 5, 8, 13, 21, 34]

  const handleAddUser = (userName: string) => {
    setUserName(userName)
    const newUserList = [
      ...userList,
      { name: userName, vote: null, id: userName },
    ]
    setUserList(newUserList)
  }

  const handleSelection = (num: number) => {
    setVoting(false)
    const indexOfUser = userList.findIndex((user) => user.id === userName)
    const newUserList = [...userList]
    newUserList[indexOfUser] = { name: userName, vote: num, id: userName }
    setUserList(newUserList)
  }

  const handleReset = () => {
    setVoting(true)
  }

  useEffect(() => {
    if (!!userName) {
      setIsShowingForm(false)
    }
  }, [userName])
  return (
    <Container size="lg" maxW="4xl">
      {isShowingForm && (
        <BasicForm
          title="Enter Name"
          placeholder="Name"
          buttonCopy="Go"
          onSubmit={(name: string) => handleAddUser(name)}
        />
      )}
      {userName && (
        <>
          <Box h="60vh" w="100%">
            <Heading textAlign="center">
              Room : {roomName?.toUpperCase()}
            </Heading>
            <Center h="10" paddingTop={4}>
              <Button
                colorScheme="blue"
                onClick={handleReset}
                isDisabled={isVoting}
              >
                Reset Vote
              </Button>
            </Center>
            <HStack spacing="10px" justify="center" paddingTop={4}>
              {userList &&
                userList.map((user) => (
                  <User
                    key={user.id}
                    isVoting={isVoting}
                    name={user.name}
                    vote={user.vote}
                  />
                ))}
            </HStack>
          </Box>
          <HStack spacing="5px" justify="center">
            {options.map((num) => (
              <Card
                key={num}
                number={num}
                isVoting={isVoting}
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
