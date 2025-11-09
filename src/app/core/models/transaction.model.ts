import { Timestamp } from '@angular/fire/firestore';

export interface Transaction {
  id?: string;
  userId?: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description?: string;
  date: Timestamp;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
