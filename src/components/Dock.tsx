import React from "react";

interface Props {}

export const Dock: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  return (
    <div className="dock h-[65px] w-[256px] rounded-[20px] px-2 flex items-center">
      {children}
    </div>
  );
};
