import React from "react";
import { useMutation } from "react-query";
import { v4 } from "uuid";
import { LocalStorageKeys, Room } from "../utils/types";
import useLocalStorage from "./useLocalStorage";
import { createBrowserClient } from "../utils/pocketbase";

type Props = { roomId: string };

function useMakeRoom({ roomId }: Props) {
  const pb = createBrowserClient();

  const [currentUser] = useLocalStorage(LocalStorageKeys.User, {});
  const fetcher = async (name: string) => {
    const id = v4();
    const roomData: Room = {
      isVoting: false,
      name,
      id,
    };
    // example create data
    const data = {
      name,
      isVoting: true,
      description: "Auto generated",
    };

    return await pb.collection("pokerRoom").create(data);
  };
  return useMutation(["voter", roomId, currentUser], fetcher);
}

export default useMakeRoom;
