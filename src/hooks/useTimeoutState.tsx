import React from "react";
import { create } from "zustand";

type Props = {};

type State = {
  timeout: number;
};
type Action = {
  setTimeout: (value: number) => void;
};
const useTimeoutState = create<State & Action>((set) => ({
  timeout: 3,
  setTimeout: (timeout: number) => set({ timeout }),
}));

export default useTimeoutState;
