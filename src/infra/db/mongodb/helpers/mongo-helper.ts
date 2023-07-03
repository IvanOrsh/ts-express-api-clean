import { type Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  url: null as unknown as string,

  async connect (url: string): Promise<void> {
    this.url = url
    this.client = await MongoClient.connect(url)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    // The correct way of dealing with an ambiguous connection is to just call MongoClient.connect() again
    await this.connect(this.url)
    return (this.client as MongoClient).db().collection(name)
  }
}
