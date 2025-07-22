import type { MockedFunction } from 'vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { handleError } from './utils';
import type { NotificationService } from '../domain/ports/NotificationService.ts';

describe('Application Utils', () => {
  let mockNotificationService: {
    [K in keyof NotificationService]: MockedFunction<NotificationService[K]>;
  };

  beforeEach(() => {
    mockNotificationService = {
      showSuccess: vi.fn(),
      showError: vi.fn(),
    };
  });

  describe('Handle Error', () => {
    it('should show notification with provided error message and rethrow error', () => {
      const errorMsg = 'Test message';
      const defaultMsg = 'Default message';
      const mockedError = new Error(errorMsg);

      expect(() => handleError(mockedError, defaultMsg, mockNotificationService)).toThrow(mockedError);
      expect(mockNotificationService.showError).toHaveBeenCalledWith(errorMsg);
    });

    it('should use default message when error is not an Error instance', () => {
      const nonErrorValue = 'some string';
      const defaultMsg = 'Default message';

      expect(() => handleError(nonErrorValue, defaultMsg, mockNotificationService)).toThrow(nonErrorValue);
      expect(mockNotificationService.showError).toHaveBeenCalledWith(defaultMsg);
    });
  });
});
