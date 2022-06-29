import React, { useDebugValue, useEffect, useRef } from "react";
import { MacOSApp } from "../components/MacOSApp";
import { useMacOSApp } from "../hooks/use-macos-app";

interface Props {
  appId: string;
}

const useRenderCounter = (label: string) => {
  const counter = useRef(0);
  counter.current++;
  console.log(`${label} rendered ${counter.current} times`);
};

export const MacOSAppContainer: React.FC<Props> = ({ appId }) => {
  const [macosApp, { open }] = useMacOSApp(appId);

  // console.log(macosApp);

  // useEffect(() => {
  //   console.log(macosApp);
  // });
  // console.log(macosApp);
  useRenderCounter("MacOSAppContainer");

  if (!macosApp) {
    return null;
  }

  return (
    <MacOSApp
      icon={macosApp.icon}
      status={macosApp.status}
      onClick={() => {
        console.log("onclick");
        open();
      }}
    />
  );
};
