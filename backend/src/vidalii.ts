import glob from 'glob'
import { DB } from "./vidalii.db";
import { Api } from "./vidalii.api";
import { VServer } from "./vidalii.server";
import type { Context } from "./vidalii.server";
export { Context }

class VidaliiService {
  public db = new DB()
  public api = new Api()
  public server = new VServer()

  private initAddsFiles() {
    console.log('Discovering .entity and .api files...\n')
    glob.
      glob.sync('**/*.api.{js,ts}', { absolute: true }).forEach(
        path => {
          console.log(path)
          require(path)
        }
      )
    glob.sync('**/*.entity.{js,ts}', { absolute: true }).forEach(
      (path) => {
        console.log(path)
        require(path)
      }
    )

  }

  public async start(): Promise<void> {
    this.initAddsFiles()
    await this.db.start()
    await this.server.start(this.db, this.api)
  }
}

export default new VidaliiService()

