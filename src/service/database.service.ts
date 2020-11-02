import { Store, User } from "../model";
import { Purchase } from "../model/purchase.model";

export class DatabaseService {
    private _dbUser: Array<User> = [];
    private _dbPurchase: Array<Purchase> = [];

    static getInstance() {
        return new DatabaseService()
    }

    saveUser(data: User): User | undefined {
        const user = this._dbUser.find(data => data.name)
        if (user) return
        this._dbUser.push(data)
        return data
    }

    getUsers(): User[] {
        return this._dbUser
    }

    getStore(): Store[] {
        return [
            { item: "Orange", price: 2 },
            { item: "Pineapple", price: 4.5 },
            { item: "Apple", price: 1.02 },
        ]
    }

    savePurchase(data: { itemIndex: number, sessionId: number }) {
        if (data.itemIndex === -1) return
        const order = this.getStore()[data.itemIndex]
        this._dbPurchase.push({ sessionId: data.sessionId, order })
    }

    getPurchases(sessionId: number): Purchase[] {
        const history = this._dbPurchase.filter(data => data.sessionId === sessionId)
        return history
    }
}