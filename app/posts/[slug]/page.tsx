import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "../lib/api";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
}

// ISR: Rebuild page every 10 seconds if data changes
export const revalidate = 10;

// Step 1: Generate all possible slugs for static generation
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Step 2: Dynamic post page
interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound(); // Next.js will render the 404 page
  }

  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex justify-between text-gray-500 text-sm mb-6">
        <span>{post.author}</span>
        <span>{new Date(post.date).toLocaleDateString()}</span>
        <span>{post.category}</span>
      </div>

      <Image
        src={post.image}
        alt={post.title}
        width={800}
        height={400}
        className="w-full h-96 object-cover mb-6 rounded-xl"
      />

      <article className="prose max-w-full">
        <p>{post.content}</p>
      </article>
    </main>
  );
}
