import { z } from 'zod';

export const quoteSchema = z.object({
  origin_port: z.string(),
  destination_port: z.string(),
  container_type: z.string(),
  carrier: z.string(),
  fright_rate: z.number().int().positive(),
  effective_date: z.coerce.date(),
});

export const createQuoteSchema = quoteSchema;
export const createQuotesSchema = z.array(quoteSchema);

export type CreateQuoteDto = z.infer<typeof createQuoteSchema>;
export type CreateQuotesDto = z.infer<typeof createQuotesSchema>;