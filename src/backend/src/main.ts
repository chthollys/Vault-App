import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FRONTEND_URL, PORT } from "utils/env";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set("trust proxy", 1);
  app.enableCors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  await app.listen(PORT ?? 8000);
}
bootstrap();
