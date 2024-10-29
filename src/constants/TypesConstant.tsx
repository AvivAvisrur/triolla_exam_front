export type FiltersType = {
  title?: string;
  description?: string;
  priority?: string | number;
  created_at?: Date;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  created_at: Date;
};
