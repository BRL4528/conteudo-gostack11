import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationsDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notifications from '../schemas/Notification';
// Data Transfer Object

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notifications>;

  constructor() {
    this.ormRepository = getMongoRepository(Notifications, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationsDTO): Promise<Notifications> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
