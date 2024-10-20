import { FC, PropsWithChildren } from "react";

const H5: FC<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <h5 {...props}>
      {children}
    </h5>
  );
};

export default H5;
