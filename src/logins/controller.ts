import { BadRequestError, Body, JsonController, Post } from "routing-controllers"

import { AuthenticatePayload } from "./authPayload"

import { signJWT } from "../jwt"

import User from "../users/entity"

@JsonController()
export default class LoginController {
  @Post("/logins")
  public async authenticate(@Body() { email, password }: AuthenticatePayload) {
    const user = await User.findOne({ where: { email } })

    if (!user || !user.id) {
      throw new BadRequestError("A user with this email does not exist")
    }
    if (!(await user.checkPassword(password))) {
      throw new BadRequestError("The password is not correct")
    }

    const jwt = signJWT({ id: user.id })

    return { jwt }
  }
}
