"use client";

import { useDate } from '@src/hooks/use-date';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { en, fr } from '@/lib/utils';


interface IProps {
  title: string;
  description: string;
  date: number;
  id: string;
  lang: 'fr' | 'en';
  image: string;
  tags: string[];
}

const LastPost = ({
  title,
  date,
  id,
  lang,
  image,
}: IProps) => {

  const formattedDate = useDate(new Date(date));
  return (

    <div className="flex rounded-lg p-1 font-semibold hover:font-black">
      <Link href={`/posts/${id}`}
        className="flex flex-col items-center p-2 rounded-lg gap-6 duration-100 h-full w-full back"
      >
        <div className="relative overflow-hidden rounded flex shrink-0 aspect-video w-3/4 h-full">
          <Image src={image} alt={title} fill loading="lazy" unoptimized />
        </div>
        <div
          className={clsx('block text-center w-full px-6 gap-x-5 space-y-2 h-full')}
        >
          <p className='text-xl'>{`${lang === 'fr' ? fr : en
            } - ${title}`}</p>
          <p className='text-sm opacity-80'>{formattedDate}</p>
        </div>
      </Link>
    </div>
  );
};

export default LastPost;
