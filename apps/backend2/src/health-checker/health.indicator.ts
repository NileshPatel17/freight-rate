import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import { Pool } from 'pg';

@Injectable()
export class DrizzleHealthIndicator extends HealthIndicator {
  constructor(private readonly pool: Pool) {
    super();
  }

  async isHealthy(key = 'drizzle-db'): Promise<HealthIndicatorResult> {
    try {
      const result = await this.pool.query('SELECT 1');
      if (result.rowCount === 1) {
        return this.getStatus(key, true);
      }
      throw new Error('Invalid response from DB');
    } catch (err) {
      throw new HealthCheckError('Drizzle DB check failed', this.getStatus(key, false));
    }
  }
}
