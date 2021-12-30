import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, 
    //   {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    // }
    )
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map: (data: any): any => {
    const { _id, ...collectionWithoutId } = data
    return Object.assign({}, collectionWithoutId, { id: _id })
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map(c => MongoHelper.map(c))
  }

  // map: (data, collection: any): any => {
  //   const { insertedId } = collection
  //   const { _id, ...items } = data
  //   return Object.assign({}, items, { id: insertedId })
  // },

  // mapGet: (data): any => {
  //   const { _id, ...items } = data
  //   return Object.assign({}, items, { id: _id })
  // },

  // mapCollection: (data: any[], collection: any[]): any[] => {
  //   return collection.map(c => MongoHelper.mapGet(c))
  // },
}
