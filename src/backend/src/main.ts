import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FRONTEND_URL, PORT } from "utils/env";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  await app.listen(PORT ?? 4000);
}
bootstrap();
