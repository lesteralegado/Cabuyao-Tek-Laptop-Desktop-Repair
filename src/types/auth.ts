export type StaffRole = 'staff' | 'admin';

export interface StaffProfile {
  id: string;
  name: string;
  role: StaffRole;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  user: any; // Using any temporarily for Supabase User, will refine if needed
  session: any;
}
