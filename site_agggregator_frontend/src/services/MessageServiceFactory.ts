import { ToastifyMessageService } from './ToastifyMessageService';
import { MessageService } from './MessageService';

export function getMessageService(): MessageService {
    return new ToastifyMessageService();
}
