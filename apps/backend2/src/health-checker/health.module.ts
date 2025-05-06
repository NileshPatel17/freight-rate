import { Module } from '@nestjs/common';
import { TerminusModule, HealthCheckService } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { DrizzleHealthIndicator } from './health.indicator';
import { Pool } from 'pg';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [
    {
      provide: 'PG_POOL',
      useFactory: () => {
        return new Pool({
          connectionString: process.env.DATABASE_URL,
        });
      },
    },
    {
      provide: DrizzleHealthIndicator,
      useFactory: (pool: Pool) => new DrizzleHealthIndicator(pool),
      inject: ['PG_POOL'],
    },
  ],
})
export class HealthModule {}
