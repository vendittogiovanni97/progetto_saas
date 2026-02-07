/**
 * Entity & Interface per Category
 */
export interface Category {
  id: number;
  name: string;
  description: string;
  icon?: string | null;
  color?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}
