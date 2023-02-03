import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { User } from '../graphql.schema';
import { UsersGuard } from './users.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('users')
  @UseGuards(UsersGuard)
  async getUsers() {
    return this.usersService.findAll();
  }

  @Query('user')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<User> {
    console.log("good");
    return this.usersService.findOneById(id);
  }

	@Mutation('createUser')
  async create(): Promise<User> {
    console.log("create");
    return this.usersService.create();
  }

	@Mutation('updateProfileMessage')
	async update(@Args('name') name :string, @Args('profileMessage') profileMessage :string): Promise<User> {
	console.log("update");
	return this.usersService.updateProfileMessage(name, profileMessage);
}
}
