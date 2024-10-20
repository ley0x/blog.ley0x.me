"use client"

import * as React from "react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Post } from "@/type/types"
import { Badge } from "../ui/badge"
import { en, fr } from "@/lib/utils"
import Fuse from "fuse.js"
import Link from "next/link"

type Props = {
  posts: Post[];
}

export const SearchBar = ({ posts }: Props) => {
  const [open, setOpen] = React.useState(false)
  const [filteredPosts, setFilteredPosts] = React.useState<Post[]>(posts)

  const fuseOptions = {
    isCaseSensitive: false,
    includeScore: false,
    // shouldSort: true,
    includeMatches: false,
    findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    ignoreLocation: true,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: [
      "meta.title",
      "meta.description"
    ]
  };

  const fuse = new Fuse(posts, fuseOptions);


  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  function searchPosts(searchQuery: string) {
    if (searchQuery.length <= 3) {
      setFilteredPosts(posts)
      return
    }
    const result = fuse.search(searchQuery)
    setFilteredPosts(result.map((r) => r.item))
  }


  return (
    <>
      <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput onValueChange={(q) => searchPosts(q)} placeholder="Search for keywords..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {filteredPosts.map((post) => (
              <CommandItem key={post.slug} >
                <Link onClick={() => setOpen(false)} href={`/posts/${post.slug}`} className="w-full h-full flex flex-col gap-y-2 items-start">
                  <p className='text-lg font-bold'>{`${post.meta.lang === 'fr' ? fr : en
                    } - ${post.meta.title}`}</p>
                  <div className="flex gap-x-2">
                    {post.meta.tags.map(tag => (
                      <Badge key={tag} variant="outline-pink">{tag}</Badge>
                    ))}
                  </div>
                  <p className='text-sm opacity-80'>{post.meta.description}</p>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
