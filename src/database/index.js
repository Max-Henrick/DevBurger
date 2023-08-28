import Sequelize from 'sequelize'
import mongoose from 'mongoose'
// import configDatabase from '../config/database'

import User from '../app/models/User'
import Product from '../app/models/Product'
import Category from '../app/models/Category'

const models = [User, Product, Category]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(
      'postgresql://postgres:dIYNK6QPM9E07dj9f20j@containers-us-west-107.railway.app:5488/railway'
    )
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://mongo:PR4KlXRixpdEJGGpS6Vg@containers-us-west-146.railway.app:6535',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
  }
}

export default new Database()
