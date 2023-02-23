import { Content } from "@application/entities/content"
import { Notification } from "@application/entities/notification"
import { makeNotification } from "@test/factories/notification-factory"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { CountRecipientNotifications } from "./count-recipient-notifications"
import { GetRecipientNotification } from "./get-recipient-notification"

describe('Get Recipient Notifications', () => {
    it('should be able to count a recipient notifications', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const getRecipientNotifications = new GetRecipientNotification(notificationsRepository)

        await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1' }))

        await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1' }))

        await notificationsRepository.create(makeNotification({ recipientId: 'recipient-2' }))

        const {notifications} = await getRecipientNotifications.execute({
            recipientId: 'recipient-1'
        })

        expect(notifications).toHaveLength(2)
        expect(notifications).toEqual(expect.arrayContaining([
            expect.objectContaining({recipientId: 'recipient-1'}),
            expect.objectContaining({recipientId: 'recipient-1'})
        ]))
    })

})
