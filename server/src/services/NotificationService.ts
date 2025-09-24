import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface NotificationData {
  userId: string;
  title: string;
  message: string;
  type?: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export interface PushNotification {
  title: string;
  message: string;
  actionUrl?: string;
  icon?: string;
  badge?: string;
}

class NotificationService {
  async createNotification(data: NotificationData) {
    return await prisma.notification.create({
      data: {
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type || 'INFO',
        actionUrl: data.actionUrl,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
      },
    });
  }

  async sendPushNotification(userId: string, notification: PushNotification) {
    // Create in-app notification
    const inAppNotification = await this.createNotification({
      userId,
      title: notification.title,
      message: notification.message,
      type: 'INFO',
      actionUrl: notification.actionUrl || '',
    });

    // Here you would integrate with actual push notification services
    // like Firebase Cloud Messaging, OneSignal, etc.
    // For now, we'll just log it and create the in-app notification
    
    console.log('Push notification sent:', {
      userId,
      title: notification.title,
      message: notification.message,
    });

    return inAppNotification;
  }

  async sendEventNotification(
    eventId: string,
    notification: Omit<PushNotification, 'actionUrl'> & { actionUrl?: string }
  ) {
    // Get all participants for the event
    const participants = await prisma.participant.findMany({
      where: { eventId },
      include: {
        event: {
          select: {
            organizerId: true,
          },
        },
      },
    });

    // Create notifications for all participants
    const eventNotifications = participants.map((participant: any) => ({
      userId: participant?.event?.organizerId || '',
      title: notification.title,
      message: notification.message,
      actionUrl: notification.actionUrl,
    }));

    const notifications = await Promise.all(
      eventNotifications.map((notification: any) =>
        this.createNotification({
          userId: notification.userId,
          title: notification.title,
          message: notification.message,
          type: 'INFO',
          actionUrl: notification.actionUrl || `/events/${eventId}`,
          metadata: {
            eventId,
            participantId: 'participant-id-placeholder',
          },
        })
      )
    );

    return notifications;
  }

  async sendCheckInNotification(participantId: string, deviceId: string) {
    const participant = await prisma.participant.findUnique({
      where: { id: participantId },
      include: {
        event: true,
      },
    });

    const device = await prisma.qikPointDevice.findUnique({
      where: { id: deviceId },
    });

    if (!participant || !device) {
      throw new Error('Participant or device not found');
    }

    return await this.createNotification({
      userId: participant.event.organizerId,
      title: 'Check-in Successful',
      message: `${participant.name} checked in at ${device.name}`,
      type: 'SUCCESS',
      actionUrl: `/events/${participant.eventId}/participants/${participantId}`,
      metadata: {
        participantId,
        deviceId,
        eventId: participant.eventId,
      },
    });
  }

  async sendEventReminder(eventId: string, hoursBefore: number = 24) {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        participants: true,
      },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    const reminderTime = new Date(event.startDate);
    reminderTime.setHours(reminderTime.getHours() - hoursBefore);

    if (new Date() < reminderTime) {
      return await this.sendEventNotification(eventId, {
        title: 'Event Reminder',
        message: `Don't forget about ${event.title} starting in ${hoursBefore} hours!`,
        actionUrl: `/events/${eventId}`,
      });
    }

    return null;
  }

  async markAsRead(notificationId: string, userId: string) {
    const notification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId,
      },
    });

    if (!notification) {
      throw new Error('Notification not found');
    }

    return await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  }

  async markAllAsRead(userId: string) {
    return await prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: { isRead: true },
    });
  }

  async getUnreadCount(userId: string) {
    return await prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }

  async getNotifications(userId: string, limit: number = 50, offset: number = 0) {
    return await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit,
    });
  }

  async deleteNotification(notificationId: string, userId: string) {
    const notification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId,
      },
    });

    if (!notification) {
      throw new Error('Notification not found');
    }

    return await prisma.notification.delete({
      where: { id: notificationId },
    });
  }
}

export default NotificationService;
