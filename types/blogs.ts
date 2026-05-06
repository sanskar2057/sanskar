export type BlogStatus = "draft" | "published";

export interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    tags: string[];
    status: BlogStatus;
    publishedAt?: string;
    createdAt?: string;
    updatedAt?: string;
}