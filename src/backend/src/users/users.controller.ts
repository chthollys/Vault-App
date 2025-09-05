import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Serialize } from "../interceptors/serialize.interceptor";
import { UserDto } from "./dtos/user.dto";

@Controller("users")
@Serialize(UserDto)
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getUsers() {
    return this.userService.findUsers();
  }

  @Get("/:id")
  getUser(@Param("id") id: string) {
    return this.userService.findUserById(id);
  }
}
