import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FRONTEND_URL, PORT } from "utils/env";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: FRONTEND_URL,
    credentials: true,
    
  });
  const port = PORT ?? 8000;
  await app.listen(port);
}
bootstrap();
