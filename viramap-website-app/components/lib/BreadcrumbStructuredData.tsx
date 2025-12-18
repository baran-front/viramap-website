"use client";

import { StructuredData, generateBreadcrumbSchema } from "./structured-data";

interface BreadcrumbStructuredDataProps {
  items: Array<{ name: string; url?: string }>;
}

export function BreadcrumbStructuredData({
  items,
}: BreadcrumbStructuredDataProps) {
  const breadcrumbSchema = generateBreadcrumbSchema(items);

  return <StructuredData data={breadcrumbSchema} />;
}

