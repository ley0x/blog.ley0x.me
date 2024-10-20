import { FC, PropsWithChildren } from "react";

const H3: FC<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <h3 {...props}>
      {children}
    </h3>
  );
};

export default H3;
