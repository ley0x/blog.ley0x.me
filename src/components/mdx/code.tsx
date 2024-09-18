import { FC, PropsWithChildren } from "react";

type Props = {
  className?: string
}

const Code: FC<PropsWithChildren<Props>> = ({ children, className, ...props }) => {
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export default Code;
