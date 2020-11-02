import { InputOutputService, DatabaseService } from "./service";

export class Application {
    private menu: Array<string> = [
        "[0] Register",
        "[1] Make a purchase",
        "[2] My purchase history",
        "[3] End"
    ];
    private selection = 0;
    private terminateProgram = 3;
    private sessionId: number | undefined;
    private defaultId = 0

    constructor(
        private inputOutputService: InputOutputService,
        private dbService: DatabaseService) {
    }

    async run() {
        this.applicationMenu()
        while (this.selection != this.terminateProgram) {
            const input = await this.inputOutputService.requestInputAsync("enter menu")
            this.selection = parseInt(input, 10)
            switch (this.selection) {
                case 0:
                    await this.registerUserAsync()
                    break;

                case 1:
                    this.makePurchase()
                    break;

                case 2:
                    this.showPurchaseHistory()
                    break;
                case 3:
                    this.closeProgram()

                default:
                    this.applicationMenu()
                    break;
            }
        }
        this.inputOutputService.outputMessage("program terminated...")
    }

    private applicationMenu() {
        this.inputOutputService.outputMessage("Application menu \n")
        this.menu.forEach(menu => this.inputOutputService.outputMessage(menu))
    }

    private async registerUserAsync() {
        const name = await this.inputOutputService.requestInputAsync("enter name")
        const password = await this.inputOutputService.requestInputAsync("enter password")
        const selection_id = Math.random()
        const phoneNumber = await this.inputOutputService.requestInputAsync("enter phone number")
        const user = this.dbService.saveUser({ name, password, selection_id, phoneNumber })
        this.sessionId = user?.selection_id
        this.inputOutputService.outputMessage("registration success")
    }

    private async makePurchase() {
        if (!this.isUserRegistered()) {
            return this.inputOutputService.outputMessage("registration required")
        }
        this.showStoreMenu()
        const data = await this.inputOutputService.requestInputAsync("select a fruit")
        const itemIndex = this.parseStoreInput(data)
        const sessionId = this.sessionId || this.defaultId
        this.dbService.savePurchase({ itemIndex, sessionId })
        this.run()
    }

    private closeProgram() {
        this.inputOutputService.outputMessage("program terminated...")
        this.inputOutputService.close()
        process.exit(0)
    }

    private showPurchaseHistory() {
        const id = this.sessionId || this.defaultId
        const history = this.dbService.getPurchases(id)
        this.inputOutputService.outputMessage("purchase history", history)
    }

    private parseStoreInput(selected: string) {
        const outOfIndex = -1;
        const indexOfOrange = 0;
        const indexOfPineapple = 1;
        const indexOfApple = 2;

        if (selected == "o") return indexOfOrange;
        if (selected == "p") return indexOfPineapple;
        if (selected == "a") return indexOfApple;
        
        return outOfIndex;
    }

    private isUserRegistered() {
        const user = this.dbService.getUsers()
        return user.length > 0;
    }

    private showStoreMenu() {
        const store = ["[o] Orange($ 2.00)", "[p] Pineapple($ 4.5)", "[a] Apple($ 1.02)"];
        store.forEach(data => this.inputOutputService.outputMessage(data))
    }

}
