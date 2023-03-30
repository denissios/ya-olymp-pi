import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";

const start = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: true
  });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
      .setTitle('Swagger')
      .setVersion('1.0.0')
      .setDescription('Description')
      .addTag('Olymp')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8080, () => console.log('Server started on PORT 7000'));
}
start();
