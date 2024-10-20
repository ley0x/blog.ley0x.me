"use client";

import { useDate } from '@src/hooks/use-date';
import clsx from 'clsx';
import Link from 'next/link';
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
}: IProps) => {

  const formattedDate = useDate(new Date(date));
  return (

    <div className="bg-card-foreground/5 hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 p-1">
      <Link href={`/posts/${id}`}
        className={clsx('flex flex-col gap-x-5 gap-y-2 min-h-fit p-2 rounded-sm duration-100 bg-card back')}
      >
        <p className='text-xl font-bold'>{`${lang === 'fr' ? fr : en
          } - ${title}`}</p>
        <p className='text-sm opacity-80 font-bold'>{formattedDate}</p>
        <div className="flex gap-x-2">
          {tags.map(tag => (
            <Badge key={tag} variant="outline-pink">{tag}</Badge>
          ))}
        </div>
        <p className='text-lg opacity-80'>{description}</p>
      </Link>
    </div>
  );
};

export default PostLink;
