
import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  // fazer com que o type script funcione criando propriedade de objeto sem que as sintaxes conflitem
  client: null as unknown as MongoClient,
  uri: null as unknown as string,
  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri
    //   , {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    // }
    )
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    // if (!this.client || !this.client.isConnected()) {
    //   await this.connect(this.uri)
    // }
    return this.client.db().collection(name)
  },

  map: (data, collection: any): any => {
    const { insertedId } = collection
    const { _id, ...items } = data
    return Object.assign({}, items, { id: insertedId })
  }
}
