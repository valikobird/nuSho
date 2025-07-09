import type { NotificationService } from '../domain/ports/NotificationService';

export const handleError = (error: unknown, defaultMessage: string, notificationService: NotificationService): void => {
  const message = error instanceof Error ? error.message : defaultMessage;
  notificationService.showError(message);
  throw error;
};
