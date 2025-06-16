export interface IUser {
  id: string;
  name: string;
  address: string;
  company?: string;
  bio?: string;
  profile_image?: string;
  role: 'user' | 'admin';
  total_energy: number;
  created_at: string;
}