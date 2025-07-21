import {
  Controller,
  Get,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/json')
  getJson(): object {
    return { foo: 'bar' };
  }

  @Get('/401')
  getUnauthorized(): void {
    throw new UnauthorizedException('error message');
  }
  @Get('/500')
  getInternalServerError(): void {
    throw new InternalServerErrorException('error message');
  }

  @Get('/json-with-data')
  getJsonWithData(): object {
    return { foo: 'bar', data: { id: 1, name: 'Test' } };
  }
}
