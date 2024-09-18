import { FC, PropsWithChildren } from "react";

const H1: FC<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <h1 id={anchor} {...props}>
      {children}
    </h1>
  );
};

export default H1;
