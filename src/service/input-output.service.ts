import { createInterface } from 'readline'

export class InputOutputService {
    private readline = createInterface({
        input: process.stdin,
        output: process.stdout
    })

    static getInstance() {
        return new InputOutputService()
    }

    requestInputAsync(question: string): Promise<any> {
        return new Promise((resolve: any, _) => {
            this.readline.question(`${question}: `, answer => {
                resolve(answer)
            })
        })
    }

    outputMessage(message: string, data: any = "") {
        console.log(`${message} \n`, data)
    }

    close() {
        this.readline.close()
    }
}