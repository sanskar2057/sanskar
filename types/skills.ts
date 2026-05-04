export interface SkillGroup {
    id: string;
    title: string;
    icon: string;
    description: string;
    skills: string[];
    order: number;
    createdAt?: string;
    updatedAt?: string;
}