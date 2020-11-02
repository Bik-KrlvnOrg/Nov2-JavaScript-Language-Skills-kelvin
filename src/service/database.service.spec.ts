import { User } from "../model";
import { DatabaseService } from "./database.service";

describe('DatabaseServiceTest', () => {
    let databaseService: DatabaseService

    beforeEach(() => {
        databaseService = DatabaseService.getInstance()
    });

    it('should be defined', () => {
        expect(databaseService).toBeDefined()
    });

    it('should save user data if user does not exits', () => {
        const user: User = {
            name: "any name",
            password: "any password",
            phoneNumber: "any phone number",
            selection_id: 0
        }

        const expected = databaseService.saveUser(user)
        expect(expected).not.toBeNull()

    });

    it('should not save user if user exits', () => {
        const user1: User = {
            name: "any name",
            password: "any password",
            phoneNumber: "any phone number",
            selection_id: 0
        }
        const user2: User = {
            name: "any name",
            password: "any password",
            phoneNumber: "any phone number",
            selection_id: 0
        }

        databaseService.saveUser(user1)
        const expected = databaseService.saveUser(user2)
        expect(expected).toBeUndefined()
    });

    it('should add new purchase', () => {
        const sessionId = 1
        const itemIndex = 1
        databaseService.savePurchase({ itemIndex, sessionId })
        const purchase = databaseService.getPurchases(sessionId)
        expect(purchase.length).toBe(1)
    });

})
