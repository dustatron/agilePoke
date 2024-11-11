import { useMutation } from "react-query";
import { createBrowserClient } from "../utils/pocketbase";

type MutateProps = {
  userId: string;
  vote: number;
};
function useUpdateVote() {
  const pb = createBrowserClient();
  const fetcher = async ({ userId, vote }: MutateProps) => {
    const data = {
      currentVote: vote,
      isActive: true,
    };

    return await pb.collection("pokerUser").update(userId, data);
  };
  return useMutation(["updateRoom"], fetcher);
}

export default useUpdateVote;
