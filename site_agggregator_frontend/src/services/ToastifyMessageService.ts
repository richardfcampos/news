import { toast } from 'react-toastify';
import { MessageService } from './MessageService';

export class ToastifyMessageService implements MessageService {
    success(message: string): void {
        toast.success(message);
    }

    error(message: string): void {
        toast.error(message);
    }
}
