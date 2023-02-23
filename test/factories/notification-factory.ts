import { Content } from "@application/entities/content";
import { Notification, NotificationProps } from "@application/entities/notification";

type Override = Partial<NotificationProps>

export function makeNotification(override: Override = {}): Notification {
    return new Notification({
        category: override.category || 'social',
        content: override.content || new Content('Nova solicitação de amizade!'),
        recipientId: 'recipient-1',
        ...override
    })
}