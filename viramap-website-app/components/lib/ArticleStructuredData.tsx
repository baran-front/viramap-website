"use client";

import { StructuredData, generateArticleSchema } from "./structured-data";

interface ArticleStructuredDataProps {
  title: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}

export function ArticleStructuredData({
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
}: ArticleStructuredDataProps) {
  const articleSchema = generateArticleSchema({
    headline: title,
    description,
    image,
    datePublished,
    dateModified,
    authorName,
  });

  return <StructuredData data={articleSchema} />;
}

