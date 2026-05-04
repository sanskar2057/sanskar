export type ProjectStatus = "draft" | "published";

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  highlights: string[];
  type: string;
  icon: string;
  github?: string;
  link?: string;
  status: ProjectStatus;
  featured: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}