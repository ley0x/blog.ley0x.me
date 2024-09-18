import { FC, PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { IoCopy } from "react-icons/io5";

type Props = {
  className?: string
}

const Pre: FC<PropsWithChildren<Props>> = ({ children, className, ...props }) => {
  return (
    <pre className={cn(className, "relative w-full max-w-full")} {...props}>
      {children}
      <Button className="absolute right-5 top-5">
        <IoCopy className="text-xl text-white" />
      </Button>
    </pre>
  );
};

export default Pre;
