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
    for (const i in voteData) {
      const userId = voteData[i].id;
      await postResetUserVote(userId);
    }

    const data = {
      isVoting: true,
    };
    await pb.collection("pokerRoom").update(roomId, data);
  };
};

export default useResetAllVotes;
