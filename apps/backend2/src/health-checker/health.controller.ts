import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';
import { DrizzleHealthIndicator } from './health.indicator';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private drizzleHealth: DrizzleHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.drizzleHealth.isHealthy(),
    ]);
  }
}
