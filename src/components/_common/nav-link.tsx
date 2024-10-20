import Link from 'next/link';
import React, { FC, PropsWithChildren } from 'react'

interface IProps {
  href: string;
}

const NavLink: FC<PropsWithChildren<IProps>> = ({ children, href }) => {
  return (
    <Link href={href} className='flex items-center px-4 h-10 bg-gray-50/10 hover:bg-gray-50/20 duration-100 rounded'>
      {children}
    </Link>
  )

}

export default NavLink;
