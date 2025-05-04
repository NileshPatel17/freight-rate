import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const fright_quote = pgTable('fright_quote', {
    shipment_id: serial('shipment_id').primaryKey(),
    origin_port: text('origin_port'),
    destination_port: text('destination_port'),
    container_type: text('container_type'),
    carrier: text('carrier'),
    fright_rate: integer('fright_rate'),
    effective_date: timestamp('effective_date'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
});