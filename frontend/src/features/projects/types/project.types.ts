export interface BaseEntity {
  id: number;
  name: string;
}

export interface Organization {
  id: number;
  name: string;
  logo: string;
  industry: BaseEntity;
}

export interface Skill extends BaseEntity {}

export interface Position {
  id: number;
  title: string;
  skills: Skill[];
  specialties: number[];
  referralBonus: number | null;
}
export interface ProjectLeader {
  id: number;
  name: string;
  lastName: string;
}

export interface Faqs {
  question: string;
  answer: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  organization: Organization;
  projectLeader: ProjectLeader;
  category: BaseEntity;
  subcategory: BaseEntity;
  status: string;
  publishedAt: string | null;
  budget: {
    hourFrom: number | null;
    hourTo: number | null;
    total: number | null;
  };
  positions: Position[];
  totalHours: number;
  goals: string[];
  faqs: Faqs[];
  startDate: string;
}