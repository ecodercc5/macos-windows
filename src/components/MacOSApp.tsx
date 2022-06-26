import { AppStatus } from "../core/types";
import { motion } from "framer-motion";
import { useInfiniteBounce } from "../hooks/use-infinite-bounce";
import { useEffect } from "react";

interface Props {
  icon: string;
  status: AppStatus;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

export const MacOSApp: React.FC<Props> = ({ icon, status, onClick }) => {
  const [y, bounce, enqueueStop] = useInfiniteBounce();

  useEffect(() => {
    if (status === "opening") {
      bounce();
    } else if (status === "opened") {
      enqueueStop();
    }
  }, [status, bounce, enqueueStop]);

  return (
    <div className="relative" onClick={onClick}>
      <motion.img
        src={icon}
        className="h-[50px] w-[50px]"
        alt="app0con"
        style={{ y }}
      />

      {status === "opened" && (
        <div
          className="absolute bg-dark h-1 w-1 opacity-50 rounded-full 
                      -bottom-1 left-1/2 -translate-x-1/2"
        />
      )}
    </div>
  );
};
