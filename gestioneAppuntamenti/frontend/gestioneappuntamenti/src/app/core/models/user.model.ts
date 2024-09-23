export interface User {
  id?: number;               // Opzionale, per identificare un utente
  firstName: string;        // Nome dell'utente
  lastName: string;         // Cognome dell'utente
  email: string;            // Email dell'utente
  pwd?: string;             // Password dell'utente (opzionale)
  roleuser: UserRoles;      // Ruolo dell'utente
}

export enum UserRoles {
  ADMIN = 'ADMIN',          // Ruolo Admin
  USER = 'USER'             // Ruolo Utente
}


