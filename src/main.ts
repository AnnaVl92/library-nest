import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { join } from 'path';
import { urlencoded } from 'express';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.useStaticAssets(join(__dirname, '..', 'views', 'public'));
  app.use(cookieParser());
  app.use(urlencoded({ extended: true }));
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => console.error(err));
