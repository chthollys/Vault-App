import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set("trust proxy", 1);
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });
  const port = process.env.PORT ?? 8000;
  await app.listen(port);
}
bootstrap();
