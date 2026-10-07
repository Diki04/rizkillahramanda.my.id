export interface TechStackCategory {
  title: string;
  items: Array<{
    name: string;
    level: 'Advanced' | 'Intermediate' | 'Familiar';
    icon?: string;
  }>;
}
