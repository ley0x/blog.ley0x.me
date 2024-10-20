"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { Post } from '@/type/types';
import { usePathname, useRouter } from 'next/navigation';
import { SearchBar } from './searchbar';
import { ToggleTheme } from '../_common/toggle-theme';
import { cn } from '@/lib/utils';

type Props = {
  posts: Post[];
}

const NavBar = ({ posts }: Props) => {

  const [post, setPost] = useState<Post | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const path = pathname.split('/')[2];
    const post = posts.find((post) => post.slug === path);
    setPost(post ?? null);
  }, [posts, pathname]);

  return (
    <nav className='flex flex-wrap justify-between items-center bg-accent w-full py-3 px-8 font-bold gap-5'>
      <div className='flex items-center gap-x-3 text-foreground/80'>
        <span className='text-foreground'>{'ley0x@blog $'}</span>
        <Link href='/' className='hover:border-b hover:border-b-pink-500'>
          Home
        </Link>
        {!!post && (
          <>
            <span className='hidden lg:block'>/</span>
            <button
              onClick={router.refresh}
              className='hidden lg:block hover:border-b hover:border-b-pink-500'
            >
              {post.meta.title}
            </button>
          </>
        )}
        <div className='h-4 w-2 bg-pink-500 animate-pulse' />
      </div>
      <div className={cn("flex gap-x-5 items-center")}>
        <SearchBar posts={posts}/>
        <ToggleTheme />
      </div>
    </nav>
  );
};

export default NavBar;
