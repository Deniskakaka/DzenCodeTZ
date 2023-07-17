import { ReactNode } from "react";

type Props = {
  index: number;
  children: ReactNode;
};

export const CardAnimation: React.FC<Props> = ({ index, children }) => {
  return (
    <div
      className={`animate__animated animate__fadeInRight animate__delay-${index}s`}
    >
      {children}
    </div>
  );
};
