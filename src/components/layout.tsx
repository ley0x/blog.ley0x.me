"use client";

import { cn } from '@/lib/utils';
import Link from 'next/link'

type Props = {
  children: React.ReactNode,
  className?: string
}

export default function Layout({ children, className }: Props) {
  return (
    <div className="flex flex-col min-h-screen relative">
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-2">
          <Link href="/">My MDX Blog</Link>
        </h1>
        <nav>
          <Link href="/" className="mr-4">Home</Link>
          <Link href="/about">About</Link>
        </nav>
      </header>
      <main className={cn("flex flex-col w-full", className)}>{children}</main>
      <footer className="mt-10 text-center text-gray-500">
        © {new Date().getFullYear()} My MDX Blog
      </footer>
    </div>
  )
}
