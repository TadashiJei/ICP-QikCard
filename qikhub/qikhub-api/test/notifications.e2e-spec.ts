import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Notifications (e2e)', () => {
  let app: INestApplication;

  const mockItems = [
    { id: 'n1', title: 'T1', message: 'M1', type: 'INFO', userId: 'u1', isRead: false, metadata: null },
  ];

  const prismaMock = {
    notification: {
      create: jest.fn().mockImplementation(({ data }: any) => ({ id: 'n2', ...data })),
      findMany: jest.fn().mockImplementation(({ where }: any) => {
        if (where?.userId) {
          return mockItems.filter((i) => i.userId === where.userId);
        }
        return mockItems;
      }),
      findUnique: jest.fn().mockImplementation(({ where }: any) => mockItems.find((i) => i.id === where.id) || null),
      update: jest.fn().mockImplementation(({ where, data }: any) => ({ ...mockItems[0], ...data, id: where.id })),
      delete: jest.fn().mockResolvedValue({ id: 'n1' }),
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

  it('POST /notifications should create a notification', async () => {
    const body = {
      title: 'Hi',
      message: 'There',
      type: 'INFO',
      userId: 'u1',
      isRead: false,
      metadata: '{"k":"v"}',
    };

    await request(app.getHttpServer())
      .post('/notifications')
      .send(body)
      .expect(201)
      .expect((res) => {
        expect(res.body.title).toBe('Hi');
        expect(res.body.userId).toBe('u1');
      });
  });

  it('GET /notifications?userId=u1 should list notifications for a user', async () => {
    await request(app.getHttpServer())
      .get('/notifications?userId=u1')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
        expect(res.body[0].userId).toBe('u1');
      });
  });
});
