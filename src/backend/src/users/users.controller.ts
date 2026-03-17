import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Serialize } from "../interceptors/serialize.interceptor";
import { UserDto } from "../dtos";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import {
  ApiCommonErrorResponses,
  ApiOkWrappedResponse,
} from "src/docs/api-response.decorators";

@Controller("users")
@Serialize(UserDto)
@ApiTags("Users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  @ApiOperation({ summary: "List users" })
  @ApiOkWrappedResponse({ type: UserDto, isArray: true })
  @ApiCommonErrorResponses()
  getAllUser(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get("/:id")
  @ApiOperation({ summary: "Get user by id" })
  @ApiParam({ name: "id", description: "User id" })
  @ApiOkWrappedResponse({ type: UserDto })
  @ApiCommonErrorResponses()
  getUser(@Param("id") id: string): Promise<UserDto> {
    return this.usersService.findById(id);
  }

  @Get("/email/:email")
  @ApiOperation({ summary: "Get user by email" })
  @ApiParam({ name: "email", description: "User email" })
  @ApiOkWrappedResponse({ type: UserDto })
  @ApiCommonErrorResponses()
  getUserByEmail(@Param("email") email: string): Promise<UserDto> {
    return this.usersService.findByEmail(email);
  }

  @Get("/review-id/:id")
  @ApiOperation({ summary: "Get user by review id" })
  @ApiParam({ name: "id", description: "Review id" })
  @ApiOkWrappedResponse({ type: UserDto })
  @ApiCommonErrorResponses()
  getUserByReviewId(@Param("id") id: string) {
    return this.usersService.findByReviewId(id);
  }
}
