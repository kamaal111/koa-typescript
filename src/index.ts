import "reflect-metadata"
import { createKoaServer } from "routing-controllers"
import PageController from "./pages/controller"

const port: string | number = process.env.PORT || 4000

const app = createKoaServer({ controllers: [PageController] })

// tslint:disable-next-line: no-console
app.listen(port, () => console.log(`Listening on port ${port}`))
