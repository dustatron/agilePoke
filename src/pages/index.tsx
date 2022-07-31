import { Container, Heading } from "@chakra-ui/react"
import { addDoc, collection } from "firebase/firestore"

import BasicForm from "../components/BasicForm"
import Head from "next/head"
import type { NextPage } from "next"
import { Room } from "../utils/types"
import { getFirestore } from "../utils/firebase"
import { useRouter } from "next/router"

const Home: NextPage = () => {
  const router = useRouter()
  const firestore = getFirestore()

  const handleSubmit = async (roomName: string) => {
    const newRoom: Room = {
      name: roomName,
      isVoting: true,
      users: [],
    }
    try {
      const docRef = await addDoc(collection(firestore, "rooms"), newRoom)
      router.push(`/poker/${docRef.id}`)
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  return (
    <>
      <Head>
        <title>Agile Poker</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <Container marginTop={6}>
          <Heading textAlign="center" margin={2}>
            Agile Poker
          </Heading>
          <hr />
          <BasicForm
            onSubmit={handleSubmit}
            title="Create Or Join A Room"
            placeholder="Room Name"
            buttonCopy="go"
          />
        </Container>
      </main>
    </>
  )
}

export default Home
