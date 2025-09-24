import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Notifications (e2e)', () => {
  let app: INestApplication;

  const mockItems = [
    { id: 'n1', title: 'T1', message: 'M1', type: 'INFO', userId: 'u1', isRead: false, metadata: null },
  ];

  const prismaMock = {
    $transaction: jest.fn().mockImplementation(async (ops: any[]) => Promise.all(ops)),
    notification: {
      create: jest.fn().mockImplementation(({ data }: any) => ({ id: 'n2', ...data })),
      count: jest.fn().mockImplementation(({ where }: any) => {
        const filtered = where?.userId ? mockItems.filter((i) => i.userId === where.userId) : mockItems;
        return filtered.length;
      }),
      findMany: jest.fn().mockImplementation(({ where, skip = 0, take = mockItems.length }: any) => {
        const filtered = where?.userId ? mockItems.filter((i) => i.userId === where.userId) : mockItems;
        return filtered.slice(skip, skip + take);
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

  it('GET /notifications?userId=u1 should list notifications for a user (paginated)', async () => {
    await request(app.getHttpServer())
      .get('/notifications?userId=u1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.total).toBeGreaterThanOrEqual(1);
        expect(res.body.page).toBe(1);
        expect(res.body.pageSize).toBeGreaterThan(0);
        expect(res.body.data[0].userId).toBe('u1');
      });
  });
});
