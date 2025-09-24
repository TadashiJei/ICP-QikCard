import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Devices Ping (e2e)', () => {
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

  it('POST /devices/:id/ping should update telemetry and return 201', async () => {
    const id = 'dev123';
    const body = {
      batteryLevel: 88,
      signalStrength: 4,
      isOnline: true,
      healthData: '{"temp":36.6}',
    };

    await request(app.getHttpServer())
      .post(`/devices/${id}/ping`)
      .send(body)
      .expect(201)
      .expect((res) => {
        expect(res.body.id).toBe(id);
        expect(res.body.batteryLevel).toBe(88);
        expect(res.body.signalStrength).toBe(4);
        expect(res.body.isOnline).toBe(true);
        expect(res.body.healthData).toBeDefined();
      });
  });
});
