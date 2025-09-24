import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Devices Create Conflict (e2e)', () => {
  let app: INestApplication;

  const prismaMock = {
    qikPointDevice: {
      create: jest.fn().mockImplementation(() => {
        const err: any = new Error('Unique constraint failed');
        err.code = 'P2002';
        throw err;
      }),
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

  it('POST /devices should return 409 when deviceId is duplicate', async () => {
    const body = {
      name: 'Device A',
      deviceType: 'NFC',
      deviceId: 'dup-123',
      locationName: 'Hall 1',
      firmwareVersion: '1.0.0',
      ownerId: 'user-1',
      configuration: '{"mode":"std"}',
    };

    await request(app.getHttpServer())
      .post(`/devices`)
      .send(body)
      .expect(409)
      .expect((res) => {
        expect(res.body.message).toContain('deviceId must be unique');
      });
  });
});
