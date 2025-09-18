import bcrypt from "bcrypt";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import type { User } from "@prisma/client";
import type { RegisterUserDto } from "src/dtos";
import { SALT_ROUNDS } from "utils/constants";

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}
  findAll(): Promise<User[]> {
    return this.usersRepo.findAll();
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepo.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with an id of ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepo.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with an email ${email} not found`);
    }
    return user;
  }

  async findByReviewId(reviewId: string): Promise<User> {
    const user = await this.usersRepo.findOne({
      where: { reviews: { some: { id: reviewId } } },
    });
    if (!user) {
      throw new NotFoundException(
        `User with a review id ${reviewId} not found`,
      );
    }
    return user;
  }

  async maybeFindById(id: string): Promise<User | null> {
    return await this.usersRepo.findUnique({ where: { id } });
  }

  async maybeFindByEmail(email: string): Promise<User | null> {
    return await this.usersRepo.findUnique({ where: { email } });
  }

  async upsertByEmail(email: string): Promise<User> {
    return await this.usersRepo.upsert({
      where: { email },
      update: {},
      create: { email },
    });
  }

  async create(data: RegisterUserDto): Promise<User> {
    const newUserData = { ...data };
    if (data.password) {
      newUserData.password = await bcrypt.hash(data.password, SALT_ROUNDS);
    }
    return this.usersRepo.create({ data: newUserData });
  }

  async verifyEmail(email: string): Promise<User> {
    const existingUser = await this.maybeFindByEmail(email);
    if (!existingUser) {
      throw new NotFoundException("User not found");
    }
    return await this.usersRepo.update({
      where: { email },
      data: { emailVerified: new Date() },
    });
  }
}
