import { type AddAccountModel, type AddAccount } from '../../../domain/usecases/add-account'
import { type AccountModel } from '../../../domain/models/account'
import { type Encrypter } from '../../protocol/encrypter'

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
