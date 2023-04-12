import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function useTransitionNavigation() {
  const { addListener } = useNavigation();
  const [transitionEnd, setTransitionEnd] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = addListener("transitionEnd", () => {
      setTransitionEnd(true);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  });

  return transitionEnd;
}
