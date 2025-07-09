import type { NotificationService } from '../../domain/ports/NotificationService';
import { toast } from 'react-toastify';

export class ToastNotificationService implements NotificationService {
  showSuccess(message: string): void {
    toast.success(message);
  }

  showError(message: string): void {
    toast.error(message);
  }
}
