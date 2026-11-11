import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory, type CategoryId } from "@/lib/content";
import { CategoryView } from "@/components/CategoryView";
import { Footer } from "@/components/HomeView";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  return c ? { title: c.name, description: c.blurb } : {};
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  return (
    <>
      <CategoryView id={c.id as CategoryId} />
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Footer />
      </div>
    </>
  );
}
