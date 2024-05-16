import {
  ClassSerializerInterceptor,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestApplication, NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { CustomValidationException } from './app/exception/exception';
import { flat } from './app/util/array';

class BootStrap {
  private app: NestApplication;

  async init() {
    this.app = await NestFactory.create(AppModule, { cors: true });

    this.setCors();
    this.setContainer();
    this.setDoc();
    this.setGlobalPipe();
    this.setGlobalInterceptor();
  }

  async run() {
    await this.app.listen(8000);
  }

  setCors() {
    this.app.enableCors();
  }

  setContainer() {
    useContainer(this.app.select(AppModule), { fallbackOnErrors: true });
  }

  setDoc() {
    const config = new DocumentBuilder()
      .setTitle('Aggregator API Docs')
      .build();
    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('doc', this.app, document);
  }

  setGlobalPipe() {
    this.app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (errors: ValidationError[]) => {
          const data = errors.map(({ constraints }) => {
            return Object.values(constraints);
          });
          return new CustomValidationException(flat(data));
        },
      }),
    );
  }

  setGlobalInterceptor() {
    this.app.useGlobalInterceptors(
      new ClassSerializerInterceptor(this.app.get(Reflector)),
    );
  }
}

(async () => {
  const App = new BootStrap();

  await App.init();
  await App.run();
})();
