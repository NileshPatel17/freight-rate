import { Controller, Get, Post, Body, ValidationPipe, UsePipes, Param, Delete, ParseIntPipe } from "@nestjs/common";
import { FrightService } from "./fright.service";
import { createQuoteSchema, createQuotesSchema, type CreateQuoteDto } from "./dto/create-quote.dto";
import { ZodValidationPipe } from "./zod-validation.pipe";

@Controller('fright')
export class FrightController {
  constructor(private readonly frightService: FrightService) { }

  @Get('quotes')
  async getQuotes() {
    return this.frightService.getFrightQuotes();
  }

  @Post('quotes')
  @UsePipes(new ZodValidationPipe(createQuoteSchema))
  async insertQuote(@Body() createQuoteDto: CreateQuoteDto) {
    return this.frightService.insertQuote(createQuoteDto)
  }

  @Post('quotes/bulk')
  @UsePipes(new ZodValidationPipe(createQuotesSchema))
  async insertBulkQuote(@Body() createQuoteDto: CreateQuoteDto[]) {
    return this.frightService.InsertBulkQuotes(createQuoteDto)
  }

  @Delete('quote/:id')
  async remove(@Param('id',ParseIntPipe) id: number) {
    await this.frightService.removeQuote(id);
    return { message: `Quote having id ${id} deleted successfully` };
  }
}