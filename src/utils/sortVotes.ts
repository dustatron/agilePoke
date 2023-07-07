import { UserData } from "./types";

interface VoteSorted {
  [key: number]: {
    count: number,
    users: UserData[]
  }

}

export const sortVotes = (voteData: UserData[]): VoteSorted => {
  const result: VoteSorted = {}
  voteData.forEach(user => {
    const item = result[user?.vote || 0]
    result[user?.vote || 0] = {
      count: item?.count ? item?.count + 1 : 1,
      users: item?.users ? [...item.users, user] : [user]
    }
  })
  return result
}