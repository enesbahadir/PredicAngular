import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`/users`);
    }

    register(user: User) {
        user.id = 0;
        return this.http.post<User>(`http://localhost:8080/register`, user, {
          observe: 'response'
        });
    }

    delete(id: number) {
        return this.http.delete(`/users/${id}`);
    }
}
