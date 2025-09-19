export enum UserAccessLevel {
  ADMIN = 'ADMIN',
  USER = 'USER',
  THERAPIST = 'THERAPIST',
  DOCTOR = 'DOCTOR',
}

export interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  gender?: string;
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
  therapistId?: string;
  institutionId?: string;
  userAccessLevel: UserAccessLevel;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserBrief {
  id: string;
  email: string;
  name: string;
  userAccessLevel: UserAccessLevel;
}

export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
  therapistId: string;
  age: number;
  institutionId: string;
  createdBy: string;
  userAccessLevel: UserAccessLevel;
}

export interface UpdateUser {
  email?: string;
  name?: string;
  password?: string;
  age?: number;
  gender?: string;
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
}