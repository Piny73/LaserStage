export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  pwd?: string;
  roleuser: UserRoles;
}

export enum UserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

