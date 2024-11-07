import { useMutation } from "react-query";
import { createBrowserClient } from "../utils/pocketbase";

type Props = { userName?: string; pokerRoom: string };

function useCreateUserPB({ userName, pokerRoom }: Props) {
  const pb = createBrowserClient();

  const fetcher = async ({ userName, pokerRoom }: Props) => {
    const data = {
      name: userName,
      pokerRoom,
    };
    const record = await pb.collection("pokerUser").create(data);

    return record;
  };
  return useMutation(["thisUser", userName, pokerRoom], fetcher);
}

export default useCreateUserPB;
