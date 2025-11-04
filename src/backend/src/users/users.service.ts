import bcrypt from "bcrypt";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import type { User, Cart } from "@prisma/client";
import type { CreateUserDto } from "src/dtos";
import { SALT_ROUNDS } from "utils/constants";
import { CartService } from "src/cart/cart.service";

@Injectable()
export class UsersService {
  constructor(
    private usersRepo: UsersRepository,
    private cartService: CartService,
  ) {}

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

  async upsertByEmailForOauth(
    email: string,
    data?: Omit<CreateUserDto, "email">,
  ): Promise<User> {
    const existingUser = await this.usersRepo.findUnique({ where: { email } });
    if (!existingUser) {
      // Create Cart
      return await this.usersRepo.create({
        data: { email, ...data, cart: { create: {} } },
      });
    }
    return await this.usersRepo.upsert({
      where: { email },
      update: { ...data },
      create: { email, ...data },
    });
  }

  async create(data: CreateUserDto): Promise<User> {
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
