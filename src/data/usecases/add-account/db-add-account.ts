import {
  type AddAccountModel,
  type AddAccount,
  type AccountModel,
  type Encrypter
} from './db-add-account.protocols'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    const { email, name, password } = account
    const hashedPassword = await this.encrypter.encrypt(password)
    return new Promise(resolve => {
      resolve({
        id: 'some_id',
        email,
        name,
        password: hashedPassword
      })
    })
  }
}
