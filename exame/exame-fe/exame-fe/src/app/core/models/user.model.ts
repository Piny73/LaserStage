// user.model.ts
export class User {
    id! : number
    name!: string;
    email!: string 
    
    constructor(init?: Partial<User>) {
      Object.assign(this, init);
    }
    
  }
  