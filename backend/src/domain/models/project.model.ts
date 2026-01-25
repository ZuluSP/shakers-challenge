import { Category, Industry, Skill, Specialty, Subcategory } from './static-data.model';

export interface Organization {
  id: number;
  name: string;
  logo: string;
  industry: Industry; 
}

export interface ProjectLeader {
  id: number;
  name: string;
  lastName: string;
}

export interface Budget {
  hourFrom: number | null;
  hourTo: number | null;
  total: number | null;
}

export interface Position {
  id: number;
  title: string;
  skills: Skill[];
  specialties: Specialty[]; 
  referralBonus: number | null;
}

export interface Faq {
    question: string;
    answer: string;
}

export class Project {
  id: number;
  title: string;
  description: string;
  organization: Organization;
  projectLeader: ProjectLeader;
  
  category: Category;
  subcategory: Subcategory;
  
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED' | 'ACTIVE' | string;

  creationDate: Date;
  startDate: Date;
  publishedAt: Date | null;

  budget: Budget;
  totalHours: number;
  
  goals: string[];
  faqs: Faq[];
  
  positions: Position[];
  
  totalApplicationsAmount: number;

  constructor(partial: Partial<Project>) {
    Object.assign(this, partial);
  }
}