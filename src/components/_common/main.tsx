import React from 'react'
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
}

const Main = ({ children, className }: Props) => {
  return (
    <main className={cn("flex flex-col w-full", className)}>{children}</main>
  )
}

export default Main;
