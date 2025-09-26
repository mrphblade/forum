export interface UserCreateInput {
  username: string;
  email: string;
  password: string;
  avatarPath?: string | null;
}

export interface UserUpdateInput {
  username?: string;
  email?: string;
  password?: string;
  role?: 'user' | 'moderator' | 'admin';
  avatarPath?: string;
}

export interface UserDTO {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  avatarPath?: string | null;
}
