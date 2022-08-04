export type UserData = {
  name: string
  vote: number | null
  id: string
}

export interface Room {
  name: string
  isVoting: boolean
}
