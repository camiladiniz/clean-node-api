import express, { Express } from 'express'
import { resolve } from 'path'

export default (app: Express): void => {
  // __dirname é o diretorio atual
  // todos os arquivos dentro da pasta static serão estáticos
  app.use('/static', express.static(resolve(__dirname, '../../static')))
}
