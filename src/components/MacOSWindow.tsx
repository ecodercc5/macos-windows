import { IMacOSWindow } from "../core/macos-window";
import { useMacOSWindowMutations } from "../hooks/use-macos-windows";
import { WindowButtons } from "./WindowButtons";

interface Props {
  window: IMacOSWindow;
}

export const MacOSWindow: React.FC<Props> = ({ window }) => {
  const { close } = useMacOSWindowMutations(window.appId);

  return (
    <div className="macos-window bg-white w-[300px] h-[300px] rounded-md p-2">
      <WindowButtons
        onClose={() => {
          close();
        }}
        onMaximize={() => {}}
        onMinimize={() => {}}
      />
    </div>
  );
};
