import { cx } from 'class-variance-authority';
import React from 'react'

type Props = {
  className?: string;
}

const Divider = ({ className }: Props) => {
  return (
    <div className={cx("h-[2px] w-full bg-card-foreground/5", className)}></div>
  )
}

export default Divider;
