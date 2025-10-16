import { getAllPosts } from "./lib/api";
import { Post } from "./types/post";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 10; // ISR: rebuild every 10s if data changes

export default async function HomePage() {
  const posts: Post[] = getAllPosts();

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <section className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-10">Next.js Blog</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4 text-sm">{post.excerpt}</p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{post.category}</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>

                <Link
                  href={`/posts/${post.slug}`}
                  className="inline-block mt-4 text-blue-600 font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
