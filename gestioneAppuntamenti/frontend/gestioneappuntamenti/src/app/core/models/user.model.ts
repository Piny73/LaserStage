// models/user.model.ts
export class User {
  id: string;
  version: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  

  constructor(id?: string, version?: number, email?: string, firstname?: string, lastname?: string, role?: string) {
      this.id = id || '';
      this.version = version || 1; // Valore di default
      this.email = email || '';
      this.first_name = firstname || '';
      this.last_name = lastname || '';
      this.role = role || '';
  
  }
}
