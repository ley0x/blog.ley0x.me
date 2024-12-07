"use client";

import { useDate } from '@src/hooks/use-date';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Badge } from "@components/ui/badge"
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

const PostLink = ({
  title,
  description,
  date,
  id,
  lang,
  tags,
  image,
}: IProps) => {

  const formattedDate = useDate(new Date(date));
  return (

    <div className="flex bg-card-foreground/5 hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 p-1">
      <Link href={`/posts/${id}`}
        className="flex flex-col sm:flex-row gap-y-4 items-center p-2 rounded-sm gap-x-6 duration-100 h-full bg-card w-full back"
      >
        <div className="relative overflow-hidden rounded flex shrink-0 aspect-video w-64 max-w-full h-full">
          <Image src={image} alt={title} fill loading="lazy" unoptimized />
        </div>
        <div
          className={clsx('block gap-x-5 space-y-2 h-full')}
        >
          <p className='text-xl font-bold'>{`${lang === 'fr' ? fr : en
            } - ${title}`}</p>
          <p className='text-sm opacity-80 font-bold'>{formattedDate}</p>
          <div className="flex gap-x-2">
            {tags.map(tag => (
              <Badge key={tag} variant="outline-pink">{tag}</Badge>
            ))}
          </div>
          <p className='text-lg line-clamp-2 opacity-80'>{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default PostLink;
