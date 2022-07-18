import React from "react"
import { useRouter } from "next/router"
type Props = {
  params: string
}

const Poker = () => {
  const router = useRouter()
  const { query } = router
  return <div>Poker {query.id}</div>
}

export default Poker
