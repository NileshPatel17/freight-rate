import { Inject, Injectable } from "@nestjs/common";
import { DATABASE_CONNECTION } from "../database/database-connection";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from './schema';

@Injectable()
export class FrightService {
    constructor(
        @Inject(DATABASE_CONNECTION)
        private readonly database: NodePgDatabase<typeof schema>
    ){}

    async getFrightQuotes(){
        return this.database.select().from(schema.fright_quote);
        // return this.database.query.fright_quote.findMany();
    }
}