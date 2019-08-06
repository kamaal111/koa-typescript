import {
  BadRequestError,
  Body,
  Get,
  HttpCode,
  JsonController,
  NotFoundError,
  Param,
  Post,
  Put,
} from "routing-controllers"

import User from "./entity"

interface FindAllUsersType {
  [users: string]: User[]
}

type FindOneUserType = User | undefined

@JsonController()
export default class PageController {
  @Get("/users")
  public async getAllUsers(): Promise<FindAllUsersType> {
    const users = await User.find()

    return { users }
  }

  @Get("/users/:id")
  public getUser(@Param("id") id: number): Promise<FindOneUserType> {
    return User.findOne(id)
  }

  @Put("/users/:id")
  public async updateUser(@Param("id") id: number, @Body() body: Partial<User>) {
    const foundUser = await User.findOne({ id })

    if (foundUser === undefined) {
      throw new NotFoundError("Cannot find user")
    }

    return User.merge(foundUser, body).save()
  }

  @Post("/users")
  @HttpCode(201)
  public async createUser(@Body() user: User): Promise<User> {
    const checkForDuplicate = await User.findOne({ where: { email: user.email } })

    if (checkForDuplicate) {
      throw new BadRequestError("User allready exists")
    }

    const { password, ...rest } = user
    const entity = User.create(rest)

    await entity.setPassword(password)

    return entity.save()
  }
}
