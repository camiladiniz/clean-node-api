import { AddAccount, AddAccountModel, AccountModel, Hasher, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {

  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository) 
    {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    // colocar {} na frente garante que um novo objeto será criado, ou seja, o valor de password não será alterado no accountData
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
