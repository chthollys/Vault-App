import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Serialize } from "../interceptors/serialize.interceptor";
import { UserDto } from "../dtos";
import { User } from "@prisma/client";

@Controller("users")
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getAllUser(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get("/:id")
  getUser(@Param("id") id: string): Promise<UserDto> {
    return this.usersService.findById(id);
  }

  @Get("/email/:email")
  getUserByEmail(@Param("email") email: string): Promise<UserDto> {
    return this.usersService.findByEmail(email);
  }

  @Get("/review-id/:id")
  getUserByReviewId(@Param("id") id: string) {
    return this.usersService.findByReviewId(id);
  }
}
