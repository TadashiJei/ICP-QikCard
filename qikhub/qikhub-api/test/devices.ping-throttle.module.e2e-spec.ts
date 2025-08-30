import { Controller, ExecutionContext, INestApplication, Injectable, Module, Post } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { ThrottlerGuard, ThrottlerModule, Throttle } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { DevicesModule } from '../src/devices/devices.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { ScheduleModule } from '@nestjs/schedule';

@Injectable()
class TestThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    return 'test-key';
  }
}

@Controller('t')
class TestThrottleController {
  @Post('ping')
  @Throttle({ default: { limit: 2, ttl: 60_000 } })
  ping() {
    return { ok: true };
  }
}

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60_000,
        limit: 100,
      },
    ]),
    ScheduleModule.forRoot(),
    DevicesModule,
    PrismaModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: TestThrottlerGuard }],
  controllers: [TestThrottleController],
})
class TestThrottleModule {}

describe('Devices Ping Throttling - Isolated Module (e2e)', () => {
  let app: INestApplication;

  const prismaMock = {
    qikPointDevice: {
      update: jest.fn().mockImplementation(({ where, data }: any) => ({
        id: where.id,
        lastSeen: data.lastSeen,
        batteryLevel: data.batteryLevel ?? null,
        signalStrength: data.signalStrength ?? null,
        isOnline: data.isOnline ?? null,
        healthData: data.healthData ?? null,
      })),
    },
  } as unknown as PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestThrottleModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns 429 for minimal controller when exceeding limit 2', async () => {
    // Two requests should pass
    for (let i = 0; i < 2; i++) {
      const res = await request(app.getHttpServer())
        .post(`/t/ping`)
        .set('X-Forwarded-For', '198.51.100.4')
        .ok(() => true)
        .send({});
      expect([201, 200]).toContain(res.status);
    }

    const limited = await request(app.getHttpServer())
      .post(`/t/ping`)
      .set('X-Forwarded-For', '198.51.100.4')
      .ok(() => true)
      .send({});
    expect(limited.status).toBe(429);
  });

  it('returns 429 when exceeding route limit 10 within TTL', async () => {
    const id = 'dev-throttle-iso-1';
    const body = { batteryLevel: 55 };

    // 10 requests should pass due to route-level @Throttle({ limit: 10 })
    for (let i = 0; i < 10; i++) {
      const res = await request(app.getHttpServer())
        .post(`/devices/${id}/ping`)
        .set('X-Forwarded-For', '203.0.113.77')
        .ok(() => true)
        .send(body);
      expect([201, 200]).toContain(res.status);
    }

    const limited = await request(app.getHttpServer())
      .post(`/devices/${id}/ping`)
      .set('X-Forwarded-For', '203.0.113.77')
      .ok(() => true)
      .send(body);

    expect(limited.status).toBe(429);
  });
});
