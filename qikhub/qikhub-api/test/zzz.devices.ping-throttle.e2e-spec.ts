import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Devices Ping Throttling (e2e)', () => {
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
      imports: [AppModule],
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

  it('enforces @Throttle on POST /devices/:id/ping (10 per 60s)', async () => {
    const id = 'dev-throttle-1';
    const body = { batteryLevel: 50 };

    let saw429 = false;
    for (let i = 0; i < 65; i++) {
      const res = await request(app.getHttpServer())
        .post(`/devices/${id}/ping`)
        .set('X-Forwarded-For', '203.0.113.10')
        .ok(() => true)
        .send(body);
      if (res.status === 429) {
        saw429 = true;
        break;
      }
    }
    expect(saw429).toBe(true);
  });
});
