import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}
  findUsers() {
    return this.usersRepo.findUsers();
  }

  findUserById(id: string) {
    return this.usersRepo.findUserById(id);
  }
}
