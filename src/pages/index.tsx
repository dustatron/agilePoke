import { Container, Heading } from "@chakra-ui/react"

import Head from "next/head"
import type { NextPage } from "next"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Agile Poker</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container>
        <Heading textAlign="center">Agile Poker</Heading>
      </Container>
    </>
  )
}

export default Home
