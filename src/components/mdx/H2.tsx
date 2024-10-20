import { FC, PropsWithChildren } from "react";

const H2: FC<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <h2 {...props}>
      {children}
    </h2>
  );
};

export default H2;
