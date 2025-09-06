import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Serialize } from "../interceptors/serialize.interceptor";
import { UserDto } from "../dtos";
import { User } from "@prisma/client";

@Controller("users")
@Serialize(UserDto)
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findUsers();
  }

  @Get("/:id")
  getUser(@Param("id") id: string): Promise<User> {
    return this.userService.findUserById(id);
  }
}
