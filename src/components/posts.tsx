"use client";
import { Post } from '@/type/types'
import React, { useState } from 'react';
import PostLink from './post-link';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils';

type Props = {
  posts: Post[];
}

const Posts = ({ posts }: Props) => {

  const [languageFilter, setLanguageFilter] = useState<string | null>(null);
  const [tagFilter, setTagFilter] = useState<string | null>(null);

  const getAllTags = () => {
    const tags = new Set<string>();
    posts.forEach(post => {
      post.meta.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }

  const filteredPosts = posts.filter(post => {
    const languageMatch = languageFilter ? post.meta.lang === languageFilter : true;
    const tagMatch = tagFilter ? post.meta.tags.includes(tagFilter) : true;
    return languageMatch && tagMatch;
  });
  return (
    <div className="flex flex-col p-4 gap-6 h-full justify-start">
      <h2 className="text-3xl font-bold"><span className="text-pink-500 font-bold text-4xl mr-2">#</span>All posts</h2>
      <div className={cn("flex flex-wrap gap-4")}>
        <Select onValueChange={(val) => setLanguageFilter(val)} >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent >
            <SelectGroup>
              <SelectLabel>Languages</SelectLabel>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={(val) => setTagFilter(val)} >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a tag" />
          </SelectTrigger>
          <SelectContent >
            <SelectGroup>
              <SelectLabel>Tags</SelectLabel>
              {getAllTags().map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <div className="flex flex-col gap-4 h-full">
          {filteredPosts.map((post) => (
            <PostLink
              key={post.slug}
              title={post.meta.title}
              description={post.meta.description}
              date={post.meta.date}
              id={post.slug ?? "-"}
              lang={post.meta.lang}
              image={post.meta.image}
              tags={post.meta.tags}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Posts;
