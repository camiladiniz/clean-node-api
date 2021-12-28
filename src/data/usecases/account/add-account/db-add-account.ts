import { AddAccount, AddAccountParams, AccountModel, Hasher, AddAccountRepository, LoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {

  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) 
    {}

  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    const hashedPassword = await this.hasher.hash(accountData.password)
    if (!account) {
      // colocar {} na frente garante que um novo objeto será criado, ou seja, o valor de password não será alterado no accountData
      const newAccount = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
      return newAccount
    }
    return null as any
  }
}
