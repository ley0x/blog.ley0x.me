import "./globals.css";
import "./prism.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import NavBar from "@/components/layout/navbar";
import { getAllPosts } from "@/lib/mdx";
import Footer from "@/components/layout/footer";

import { ThemeProvider } from "@/components/theme-provider"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Blog - ley0x",
  description: "Blog de ley0x",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const posts = getAllPosts();
  return (
    <html lang="en">
      <body
        className={cn(`${geistSans.variable} ${geistMono.variable} antialiased`, "flex flex-col justify-between min-h-screen relative bg-background text-foreground")}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar posts={posts} />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
