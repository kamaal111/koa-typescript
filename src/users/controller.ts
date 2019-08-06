import {
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
  public async updatePage(@Param("id") id: number, @Body() body: Partial<User>) {
    const foundPage = await User.findOne({ id })

    if (foundPage === undefined) {
      throw new NotFoundError("Cannot find page")
    }

    return User.merge(foundPage, body).save()
  }

  @Post("/users")
  @HttpCode(201)
  public createPage(@Body() page: User) {
    return page.save()
  }
}
