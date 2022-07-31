import { Container, Heading } from "@chakra-ui/react"

import BasicForm from "../components/BasicForm"
import Head from "next/head"
import type { NextPage } from "next"
import { useRouter } from "next/router"

const Home: NextPage = () => {
  const router = useRouter()

  const handleSubmit = async (roomName: string) => {
    router.push(`/${roomName.toLowerCase()}`)
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
