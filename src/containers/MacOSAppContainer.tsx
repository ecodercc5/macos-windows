import React from "react";
import { MacOSApp } from "../components/MacOSApp";
import { useMacOSApp } from "../hooks/use-macos-app";

interface Props {
  appId: string;
}

export const MacOSAppContainer: React.FC<Props> = ({ appId }) => {
  const [macosApp, { open }] = useMacOSApp(appId);

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
