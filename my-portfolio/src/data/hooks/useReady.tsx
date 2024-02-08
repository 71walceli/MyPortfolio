import { useContext } from "react";
import { ReadyContext } from "../contexts/ReadyContext";

export const useReady = () => {
  const { ready, setReady } = useContext(ReadyContext);
  if (ready === undefined || !setReady) {
    throw new Error("No context for ready!")
  }

  return { ready, setReady };
};
