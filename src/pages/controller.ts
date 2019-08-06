import { Body, Get, HttpCode, JsonController, Param, Post, Put } from "routing-controllers"
import { Page, pagesById } from "./data"

interface PageDatabaseResult {
  [pages: string]: Page[]
}

@JsonController()
export default class PageController {
  @Get("/pages")
  public getAllPages = (): PageDatabaseResult => {
    const pages = Object.values(pagesById).map(page => page)

    return { pages }
  }

  @Get("/pages/:id")
  public getPage(@Param("id") id: number): Page {
    return pagesById[id]
  }

  @Put("/pages/:id")
  public updatePage(@Param("id") id: number, @Body() body: Partial<Page>): Page {
    // tslint:disable-next-line: no-console
    console.log(`Incoming PUT body param:`, body)
    return pagesById[id]
  }

  @Post("/pages")
  @HttpCode(201)
  public createPage(@Body() body: Page): Page {
    // tslint:disable-next-line: no-console
    console.log(`Incoming POST body param:`, body)
    return body
  }
}
