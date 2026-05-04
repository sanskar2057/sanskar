export interface WorkExperience {
    id: string;
    company: string;
    location: string;
    role: string;
    startDate: string;
    endDate: string;
    isPresent: boolean;
    details: string;
    order: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface QuickFact {
    id: string;
    label: string;
    value: string;
    icon: string;
    order: number;
    createdAt?: string;
    updatedAt?: string;
}