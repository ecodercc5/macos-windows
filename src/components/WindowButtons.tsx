import React from "react";

interface Props {
  onMaximize: () => void;
  onMinimize: () => void;
  onClose: () => void;
}

export const WindowButtons: React.FC<Props> = ({
  onMaximize,
  onMinimize,
  onClose,
}) => {
  return (
    <div className="flex gap-2">
      <button
        className="h-3 w-3 bg-[#FF6159] rounded-full border-[#CE5347] border-[0.5px]"
        onClick={onClose}
      />
      <button
        className="h-3 w-3 bg-[#FEBD2D] rounded-full border-[#D6A243] border-[0.5px]"
        onClick={onMinimize}
      />
      <button
        className="h-3 w-3 bg-[#61C454] rounded-full border-[#58A942] border-[0.5px]"
        onClick={onMaximize}
      />
    </div>
  );
};
