import { Application } from "./app"
import { InputOutputService, DatabaseService } from "./service"

const application = new Application(InputOutputService.getInstance(), DatabaseService.getInstance())
application.run()