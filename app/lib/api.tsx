import posts from '../data/posts.json';

export const getAllPosts = () => posts;

export const getPostBySlug = (slug: string) => posts.find(p => p.slug === slug);

export const getPostsByCategory = (category: string) =>
    posts.filter(p => p.category === category);
