export interface BaseEntity {
  id: number;
  name: string;
}

export interface Skill extends BaseEntity {}
export interface Specialty extends BaseEntity {}
export interface Industry extends BaseEntity {}
export interface Category extends BaseEntity {}
export interface Subcategory extends BaseEntity {
  categoryId?: number;
}