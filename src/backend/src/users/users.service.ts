import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}
  findAll(): Promise<User[]> {
    return this.usersRepo.findAll();
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepo.findById(id);
    if (!user) {
      throw new NotFoundException(`User with an id of ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepo.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with an email ${email} not found`);
    }
    return user;
  }

  async findByReviewId(reviewId: string): Promise<User> {
    const user = await this.usersRepo.findByReviewId(reviewId);
    if (!user) {
      throw new NotFoundException(
        `User with a review id ${reviewId} not found`,
      );
    }
    return user;
  }
}
