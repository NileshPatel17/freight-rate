import { Inject, Injectable } from "@nestjs/common";
import { DATABASE_CONNECTION } from "../database/database-connection";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from './schema';
import type { CreateQuoteDto } from "./dto/create-quote.dto";
import { eq } from "drizzle-orm";

@Injectable()
export class FrightService {
    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly database: NodePgDatabase<typeof schema>
    ){}

    async getFrightQuotes(){
        return this.database.select().from(schema.fright_quote);
    }
    async insertQuote (createQuoteDto: CreateQuoteDto){
        return this.database.insert(schema.fright_quote).values(createQuoteDto).returning();
    }

    async InsertBulkQuotes(createQuotesDto: CreateQuoteDto[]){
        return this.database.insert(schema.fright_quote).values(createQuotesDto).returning();
    }

    async removeQuote(id: number){
        return this.database.delete(schema.fright_quote).where(eq(schema.fright_quote.shipment_id,id))
    }
}