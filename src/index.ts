import "reflect-metadata"
import { createKoaServer } from "routing-controllers"

import setupDb from "./db"
import PageController from "./pages/controller"
import UserController from "./users/controller"

const port: string | number = process.env.PORT || 4000

const app = createKoaServer({ controllers: [PageController, UserController] })

setupDb()
  // tslint:disable-next-line: no-console
  .then(_ => app.listen(port, () => console.log(`Listening on port ${port}`)))
  // tslint:disable-next-line: no-console
  .catch(err => console.error(err))
