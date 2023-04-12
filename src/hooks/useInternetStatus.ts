import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

const useInternetStatus = () => {
  const [netInfo, setNetInfo] = useState<boolean>(true);

  useEffect(() => {
    NetInfo.fetch().then((state:any) => {
      setNetInfo(state.isConnected);
    });
    const unsubscribe = NetInfo.addEventListener((state:any) => {
      setNetInfo(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  return netInfo;
};

export default useInternetStatus;
