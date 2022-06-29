import { IMacOSWindow } from "../core/macos-window";
import { WindowButtons } from "./WindowButtons";

interface Props {
  window: IMacOSWindow;
}

export const MacOSWindow: React.FC<Props> = ({ window }) => {
  return (
    <div className="macos-window bg-white w-[300px] h-[300px] rounded-md p-2">
      <WindowButtons
        onClose={() => {}}
        onMaximize={() => {}}
        onMinimize={() => {}}
      />
    </div>
  );
};
