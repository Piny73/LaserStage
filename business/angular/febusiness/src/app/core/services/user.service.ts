import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly endpoint = 'company';
  private userList: User[] = [];

  constructor(private authService: AuthService) { }

  getUser() : User | null  {     
    return this.authService.getUser!();
  }

  findById(_id: number): User | undefined {
    return this.userList.find(__user => __user.id === _id);
  }
}
