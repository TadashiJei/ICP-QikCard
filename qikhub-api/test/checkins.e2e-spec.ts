import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { NotificationsService } from '../src/notifications/notifications.service';

describe('Checkins (e2e)', () => {
  let app: INestApplication;

  const prismaMock = {
    participant: {
      findFirst: jest.fn().mockResolvedValue({ id: 'p1', name: 'Alice', eventId: 'e1' }),
      update: jest.fn().mockResolvedValue({}),
    },
    checkIn: {
      create: jest.fn().mockImplementation(({ data }: any) => ({
        id: 'ci1',
        checkInTime: data.checkInTime,
        eventId: data.eventId,
        participantId: data.participantId,
        userId: data.userId,
        deviceId: data.deviceId ?? null,
        metadata: data.metadata ?? null,
      })),
      findFirst: jest.fn().mockResolvedValue({ id: 'ci1', checkInTime: new Date(), metadata: null }),
      update: jest.fn().mockResolvedValue({ id: 'ci1', checkOutTime: new Date() }),
    },
  } as unknown as PrismaService;

  const notificationsMock = {
    create: jest.fn().mockResolvedValue({ id: 'n1' }),
  } as unknown as NotificationsService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .overrideProvider(NotificationsService)
      .useValue(notificationsMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /checkins/check-in should create a check-in and return 201', async () => {
    const body = {
      participantId: 'p1',
      eventId: 'e1',
      userId: 'u1',
      deviceId: 'd1',
      metadata: '{"source":"kiosk"}',
    };

    await request(app.getHttpServer())
      .post('/checkins/check-in')
      .send(body)
      .expect(201)
      .expect((res) => {
        expect(res.body.participantId).toBe('p1');
        expect(res.body.eventId).toBe('e1');
      });
  });

  it('POST /checkins/check-out should mark checkout and return success', async () => {
    const body = {
      participantId: 'p1',
      eventId: 'e1',
      userId: 'u1',
      deviceId: 'd1',
      metadata: '{"note":"leaving"}',
    };

    await request(app.getHttpServer())
      .post('/checkins/check-out')
      .send(body)
      .expect(201)
      .expect((res) => {
        expect(res.body.success).toBe(true);
      });
  });
});
