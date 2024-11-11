import { useMutation } from "react-query";
import { createBrowserClient } from "../utils/pocketbase";

type MutateProps = { roomId: string; isVoting: boolean };
const pb = createBrowserClient();

const useUpdateVoteStatus = () => {
  const fetcher = async ({ roomId, isVoting }: MutateProps) => {
    const data = {
      isVoting,
    };

    const record = await pb.collection("pokerRoom").update(roomId, data);
  };
  return useMutation(["updateRoomVoteStatus"], fetcher);
};

export default useUpdateVoteStatus;
