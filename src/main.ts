import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WrapperInterceptor } from './wrapper.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new WrapperInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
