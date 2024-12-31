import { PokerUserRecord } from "pocketTypes";
import { createBrowserClient } from "../utils/pocketbase";

const useResetAllVotes = () => {
  const pb = createBrowserClient();
  const postResetUserVote = async (userId: string) => {
    const data = {
      currentVote: 0,
      isActive: false,
    };
    return await pb.collection("pokerUser").update(userId, data);
  };

  return async (voteData: PokerUserRecord[], roomId: string) => {
    const clearedVote = {
      currentVote: 0,
      isActive: false,
    };
    const roomData = {
      isVoting: true,
    };

    await pb.collection("pokerRoom").update(roomId, roomData);
    await Promise.all(
      voteData
        .filter((item) => item.pokerRoom === roomId)
        .map((vote) =>
          pb
            .collection("pokerUser")
            .update(vote.id, clearedVote)
            .then((item) => console.log("clear", item))
        )
    );
  };
};

export default useResetAllVotes;
