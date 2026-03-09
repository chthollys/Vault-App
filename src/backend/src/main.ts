import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";

async function bootstrap() {
  const isProduction = process.env.NODE_ENV === "production";
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  app.set("trust proxy", 1);
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  if (!isProduction) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle("Vault App Backend API")
      .setDescription("API documentation for Vault App backend")
      .setVersion("1.0")
      .addCookieAuth("access_token")
      .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("api/docs/swagger", app, swaggerDocument);

    app.use(
      "/api/docs",
      apiReference({ content: swaggerDocument, theme: "elysiajs" }),
    );
  }

  const port = process.env.PORT ?? 8000;
  await app.listen(port);
}
bootstrap();
