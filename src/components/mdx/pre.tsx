import React, { FC, PropsWithChildren, useEffect } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { IoCheckbox, IoCopy } from "react-icons/io5";

type Props = {
  className?: string
}

const Pre: FC<PropsWithChildren<Props>> = ({ children, className, ...props }) => {
  const ref = React.useRef<HTMLPreElement>(null);
  const [isCopied, setIsCopied] = React.useState(false)
  const copyToClipboard = async () => {
    if (ref.current?.textContent) {
      try {
        await navigator.clipboard.writeText(ref.current?.textContent ?? "");
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      } catch (error) {
        console.error("Failed to copy text: ", error);
      }
    }
  };

  useEffect(() => {
    console.log("Content :", ref.current?.textContent);
  }, [ref]);

  return (
    <div className="relative">
      <pre ref={ref} className={cn(className)} {...props} >
        {children}
      </pre>
      <Button onClick={copyToClipboard} className="absolute right-2 top-4 bg-card/80 hover:bg-card">
        {isCopied ? <IoCheckbox className="text-xl text-card-foreground/80" /> : (
          <IoCopy className="text-xl text-card-foreground/80" />
        )}
      </Button>
    </div>
  );
};

export default Pre;
