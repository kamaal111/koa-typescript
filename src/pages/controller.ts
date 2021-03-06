import {
  Authorized,
  Body,
  Get,
  HttpCode,
  JsonController,
  NotFoundError,
  Param,
  Post,
  Put,
} from "routing-controllers"

import Page from "./entity"

interface FindAllPagesType {
  [pages: string]: Page[]
}

type FindOnePageType = Page | undefined

@JsonController()
export default class PageController {
  @Get("/pages")
  public async getAllPages(): Promise<FindAllPagesType> {
    const pages = await Page.find()

    return { pages }
  }

  @Get("/pages/:id")
  public getPage(@Param("id") id: number): Promise<FindOnePageType> {
    return Page.findOne(id)
  }

  @Put("/pages/:id")
  public async updatePage(@Param("id") id: number, @Body() body: Partial<Page>) {
    const foundPage = await Page.findOne({ id })

    if (foundPage === undefined) {
      throw new NotFoundError("Cannot find page")
    }

    return Page.merge(foundPage, body).save()
  }

  @Authorized()
  @Post("/pages")
  @HttpCode(201)
  public createPage(@Body() page: Page): Promise<Page> {
    return page.save()
  }
}
