import "reflect-metadata"
import { Action, createKoaServer } from "routing-controllers"

import setupDb from "./db"

import loginsController from "./logins/controller"
import PageController from "./pages/controller"
import UserController from "./users/controller"

import { verifyJWT } from "./jwt"

const port = process.env.PORT || 4000

const app = createKoaServer({
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization

    if (header && header.startsWith("Bearer ")) {
      const [, token] = header.split(" ")

      return !!(token && verifyJWT(token))
    }
    // ...
    return false
  },
  controllers: [PageController, UserController, loginsController],
})

setupDb()
  // tslint:disable-next-line: no-console
  .then(_ => app.listen(port, () => console.log(`Listening on port ${port}`)))
  // tslint:disable-next-line: no-console
  .catch(err => console.error(err))
