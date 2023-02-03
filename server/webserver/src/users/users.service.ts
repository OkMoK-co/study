import { Injectable } from '@nestjs/common';
import { User } from '../graphql.schema';

@Injectable()
export class UsersService {
  private readonly users: Array<User & { name?: string }> = [
    { id: 1, name: 'User', profileMessage: '테스트주웅...!!', email: 'user@user.com'},
  ];

	create(): User {
		const user = new User();
    user.id = this.users.length + 1;
		user.name = 'Guest' + user.id; 										// test
		user.profileMessage = 'profileMessage' + user.id; // test
		user.email = '@email'; 														// test
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOneById(id: number): User {
    return this.users.find(user => user.id === id);
  }

	updateProfileMessage(name: string, profileMessage: string): User {
		const user = this.users.find(user => user.name === name);
		user.profileMessage = profileMessage;
		return user;
	}
}
