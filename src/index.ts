import "reflect-metadata";
import { createKoaServer } from "routing-controllers";
import Controller from "./controller";

const port: string | number = process.env.PORT || 4000;

const app = createKoaServer({
  controllers: [Controller],
});

// tslint:disable-next-line: no-console
app.listen(port, () => console.log(`Listening on port ${port}`));
