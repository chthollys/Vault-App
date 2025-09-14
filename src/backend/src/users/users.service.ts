import bcrypt from "bcrypt";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import type { User } from "@prisma/client";
import type { RegisterDto } from "src/dtos";
import { SALT_ROUNDS } from "utils/constants";

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

  async existByEmail(email: string): Promise<boolean> {
    return !!(await this.usersRepo.findByEmail(email));
  }

  async existById(id: string): Promise<boolean> {
    return !!(await this.usersRepo.findById(id));
  }

  async create(data: RegisterDto): Promise<User> {
    const newUserData = { ...data };
    if (data.password) {
      newUserData.password = await bcrypt.hash(data.password, SALT_ROUNDS);
    }
    return this.usersRepo.create(newUserData);
  }

  async verifyEmail(email: string): Promise<User> {
    const existingUser = await this.existByEmail(email);
    if (!existingUser) {
      throw new NotFoundException("User not found");
    }
    return await this.usersRepo.update({
      where: { email },
      data: { emailVerified: new Date() },
    });
  }
}
