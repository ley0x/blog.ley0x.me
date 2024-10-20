import { FC, PropsWithChildren } from "react";

const H4: FC<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <h4 {...props}>
      {children}
    </h4>
  );
};

export default H4;
