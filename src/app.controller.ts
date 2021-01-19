import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('cat')
  getCat(): string {
    return this.appService.getCat();
  }
  @Get('ab*cd')
  findAll() {
    return 'ab 블라블라.. cd';
  }
}
