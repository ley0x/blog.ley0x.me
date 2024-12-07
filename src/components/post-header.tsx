"use client";
import React from 'react'
import { Badge } from './ui/badge';
import { useDate } from '@/hooks/use-date';
import Image from "next/image";
import Link from "next/link";
import { PostMeta } from '@/type/types';


type Props = {
  meta: PostMeta
}

const PostHeader = ({ meta }: Props) => {
  const formattedDate = useDate(new Date(meta.date));
  return (
    <header className='flex flex-col w-full gap-y-4'>
      <div className='flex flex-row flex-wrap gap-2'>
        {meta.tags.map((tag, i) => (
          <Badge key={i} variant="outline-pink">{tag}</Badge>
        ))}
      </div>
      <h1 className="text-3xl font-bold" id="title">{meta.title}</h1>
      <h2 className='text-md text-white/80 font-semibold' id="author"><Link href={`https://x.com/${meta.author}`} className="hover:underline" target="_blank">{meta.author}</Link> / {formattedDate}</h2>
      <div className='relative object-cover flex h-80 rounded-xl overflow-hidden shadow'>
        <Image
          src={meta.image}
          fill
          alt={meta.title}
        />
      </div>
    </header>
  )
}

export default PostHeader;
