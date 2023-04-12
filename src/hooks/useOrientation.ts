import {useState} from 'react';
import {useEffect, useCallback} from 'react';
import Orientation from 'react-native-orientation-locker';

export default function useOrientation() {
  const [flag, setFlag] = useState <boolean>(true);
  const [deviceOrientation, setDeviceOrientation] = useState<String>('');

  if (flag) {
    Orientation.getDeviceOrientation((orientation:String) => {
      setDeviceOrientation(orientation);
    });
  }

  const isLandscape = useCallback(
    () => !!deviceOrientation.match('LANDSCAPE'),
    [deviceOrientation],
  )();

  const isPortraitUpsideDown = useCallback(
    () => !!deviceOrientation.match('PORTRAIT-UPSIDEDOWN'),
    [deviceOrientation],
  )();

  useEffect(() => {
    setFlag(false);
    Orientation.addDeviceOrientationListener((e:any) => {
      setDeviceOrientation(e);
    });
  }, []);

  return {isLandscape, isPortraitUpsideDown};
}
