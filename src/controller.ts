import { Controller, Get } from "routing-controllers";

@Controller()
export default class MainController {
  @Get("/hello")
  public main() {
    return { hello: "World" };
  }
}
