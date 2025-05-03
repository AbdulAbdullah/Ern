export interface Quest {
  id: string;
  title: string;
  description: string;
  rewards: {
    amount: number;
    token: string;
  };
  difficulty: 'Easy' | 'Medium' | 'Hard';
  deadline?: Date;
  status: 'Available' | 'In Progress' | 'Completed';
  requirements: string[];
}