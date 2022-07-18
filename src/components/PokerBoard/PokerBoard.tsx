import React, { useEffect, useState } from "react"

import BasicForm from "../BasicForm"

type Props = {
  roomName?: string
}

const PokerBoard = ({ roomName }: Props) => {
  const [userName, setUserName] = useState("")
  const [isShowingForm, setIsShowingForm] = useState(true)

  useEffect(() => {
    if (!!userName) {
      setIsShowingForm(false)
    }
  }, [userName])
  return (
    <div>
      <div>PokerBoard</div>
      <div>Room Name: {roomName}</div>
      {userName && <div>name: {userName}</div>}
      {isShowingForm && (
        <BasicForm
          title="Enter Name"
          placeholder="Name"
          buttonCopy="Go"
          onSubmit={(name: string) => setUserName(name)}
        />
      )}
    </div>
  )
}

export default PokerBoard
