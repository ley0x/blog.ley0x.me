import { FC, PropsWithChildren } from "react";

const H6: FC<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <h6 {...props}>
      {children}
    </h6>
  );
};

export default H6;
