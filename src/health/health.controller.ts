import { Controller, Get, Logger } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  private readonly logger = new Logger(HealthController.name);

  @Get()
  @HealthCheck()
  check() {
    this.logger.debug('returning health check results');
    return this.health.check([
      () => this.http.pingCheck('basic check', 'http://localhost:3000'),
    ]);
  }
}
