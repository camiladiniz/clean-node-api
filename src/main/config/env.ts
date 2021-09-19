export default {
  mongoUrl: (process.env.MONGO_URL != null) || 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT || 5050
}
