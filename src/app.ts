import config from 'config'
import { version } from '../package.json'

import auth from './controllers/auth'
import controllers from './controllers'
import { app, httpServer} from './startup'
import { badWords } from './utils/data'

const mongoose = require('mongoose');

const port = config.get<number>('port')
const host = config.get<string>('host')

// app.use('/', auth)
app.use('/', auth)

let db = `mongodb+srv://devtee:eMoIJyEBHSsBdXeo@cluster0.g8jl5.mongodb.net/zikiauth?retryWrites=true&w=majority`

mongoose
  .connect((db), {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB...");
    httpServer.listen(port, host, () => {
      badWords['dot'] = {value: 'dot', _id: 'dot'};
      badWords['com'] = {value: 'com', _id: 'comk'};
    
      console.info(`🚀 Server version ${version} is listening 🚀`)
      console.info(`http://${host}:${port}`)
    
    })
  })
  .catch((err: any) => console.error("Could not connect to MongoDB...", err));