import { Controller, Get, Post } from "@nestjs/common";
import { FrightService } from "./fright.service";

@Controller('fright')
export class FrightController {
    constructor(private readonly frightService: FrightService) {}

  @Get('quotes')
  async getUsers() {
    return this.frightService.getFrightQuotes();
  }
}