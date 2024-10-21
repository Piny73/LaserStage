// user.model.ts
export class User {
    id! : number
    name!: string;
    email!: string;
    pwd!: string;
    
    constructor(init?: Partial<User>) {
      Object.assign(this, init);
    }
    
  }
  