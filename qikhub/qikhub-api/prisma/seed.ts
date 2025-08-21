import { PrismaClient, DeviceType, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed IDs so reruns are idempotent
  const userId = 'seed-user-1';
  const eventId = 'seed-event-1';
  const deviceId = 'seed-device-1';
  const participantIds = ['seed-participant-1', 'seed-participant-2'];

  // 1) Organizer user
  const organizer = await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      principalId: 'seed-principal-aaaa',
      email: 'organizer@example.com',
      displayName: 'Seed Organizer',
      role: UserRole.ORGANIZER,
      isActive: true,
    },
  });

  // 2) Event
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const event = await prisma.event.upsert({
    where: { id: eventId },
    update: {},
    create: {
      id: eventId,
      name: 'Sample Conference 2025',
      description: 'A seeded sample event for local development',
      startDate: now,
      endDate: tomorrow,
      maxAttendees: 200,
      venueName: 'Main Hall',
      venueAddress: '123 Demo Street',
      wifiAvailable: true,
      registrationOpen: true,
      requireApproval: false,
      organizerId: organizer.id,
    },
  });

  // 3) Device bound to event and organizer
  const device = await prisma.qikPointDevice.upsert({
    where: { id: deviceId },
    update: {},
    create: {
      id: deviceId,
      name: 'Kiosk 1',
      deviceType: DeviceType.NFC,
      deviceId: 'DEV-LOCAL-001',
      locationName: 'Entrance Gate',
      firmwareVersion: '1.0.0',
      ownerId: organizer.id,
      eventId: event.id,
      configuration: { mode: 'standard' },
      healthData: { cpuTemp: 43.2 },
    },
  });

  // 4) Participants
  const participants = [] as any[];
  for (let i = 0; i < participantIds.length; i++) {
    const p = await prisma.participant.upsert({
      where: { id: participantIds[i] },
      update: {},
      create: {
        id: participantIds[i],
        name: `Attendee ${i + 1}`,
        email: `attendee${i + 1}@example.com`,
        phone: `+1000000000${i + 1}`,
        eventId: event.id,
      },
    });
    participants.push(p);
  }

  console.log('Seeded:');
  console.log({ organizer, event, device, participants });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
