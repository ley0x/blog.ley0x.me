"use client";

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import React from 'react'

import H1 from '@/components/mdx/H1'
import H2 from '@/components/mdx/H2'
import H3 from '@/components/mdx/H3'
import H4 from './mdx/H4';
import H5 from './mdx/H5';
import H6 from './mdx/H6';
import Info from './mdx/info';
import Warning from './mdx/warning';
import Example from './mdx/example';
import Tip from './mdx/tip';
import Code from './mdx/code';
import Pre from './mdx/pre';

type Props = {
  source: MDXRemoteSerializeResult;
}
const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  Info,
  Warning,
  Example,
  Tip,
  code: Code,
  pre: Pre
}

const BlogArticle = ({ source }: Props) => {
  return (
    <MDXRemote {...source} components={components} />
  )
}

export default BlogArticle;
