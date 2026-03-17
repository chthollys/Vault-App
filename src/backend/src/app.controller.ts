import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ApiOkWrappedResponse } from "./docs/api-response.decorators";

@Controller()
@ApiTags("App")
export class AppController {
  @Get()
  @ApiOperation({ summary: "Health check endpoint" })
  @ApiOkWrappedResponse({ description: "Service is up" })
  getHello() {
    return "hello world";
  }
}
