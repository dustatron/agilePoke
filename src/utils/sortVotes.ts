import { PokerUserRecord } from "pocketTypes";
import { UserData } from "./types";

interface VoteSorted {
  [key: number]: {
    count: number;
    users: PokerUserRecord[];
  };
}

export const sortVotes = (voteData: PokerUserRecord[]): VoteSorted => {
  const result: VoteSorted = {};
  voteData.forEach((user) => {
    const item = result[user?.currentVote || 0];
    result[user?.currentVote || 0] = {
      count: item?.count ? item?.count + 1 : 1,
      users: item?.users ? [...item.users, user] : [user],
    };
  });
  return result;
};
