import { AppState } from "../core/types";

interface Props {
  state: AppState;
}

export const MacOSApp: React.FC<Props> = ({ state }) => {
  return (
    <div className="relative">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Finder_Icon_macOS_Big_Sur.png"
        className="h-[50px] w-[50px]"
      />

      {state === "opened" && (
        <div
          className="absolute bg-dark h-1 w-1 opacity-50 rounded-full 
                      -bottom-1 left-1/2 -translate-x-1/2"
        />
      )}
    </div>
  );
};
