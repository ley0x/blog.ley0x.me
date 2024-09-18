"use client";

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react'

type Heading = {
  id: string
  text: string
  level: number
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'))
      .map((elem) => ({
        id: elem.id,
        text: elem.textContent ?? '',
        level: Number(elem.tagName.charAt(1))
      }))
    setHeadings(elements)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0% 0% -80% 0%' }
    )

    headings.forEach((heading) => {
      const elem = document.getElementById(heading.id)
      if (elem) observer.observe(elem)
    })

    return () => observer.disconnect()
  }, [headings])

  return (
    <aside className="relative w-64 hidden lg:flex">
      <nav className="fixed toc w-64 p-2 bg-gray-50/5 rounded-lg shadow">
        <p className="text-lg font-semibold mb-2">Table of Contents</p>
        <ul>
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={cn("w-56 flex flex-col justify-center content-center h-8 relative before:content-[''] before:flex before:h-full before:w-1 before:absolute before:left-0",
                heading.level === 2 ? 'pl-3' : 'pl-5',
                activeId === heading.id ? 'text-pink-500 before:bg-pink-500 font-medium' : 'before:bg-gray-50/20'
              )}
            >
              <a href={`#${heading.id}`} onClick={(e) => {
                e.preventDefault()
                document.querySelector(`#${heading.id}`)?.scrollIntoView({
                  behavior: 'smooth'
                })
              }}>
                <span className="w-full truncate text-wrap line-clamp-1">{heading.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
