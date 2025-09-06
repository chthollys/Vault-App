import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}
  findUsers(): Promise<User[]> {
    return this.usersRepo.findAll();
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.usersRepo.findById(id);
    if (!user) {
      throw new NotFoundException(`User with an id of ${id} not found`);
    }
    return user;
  }
}
