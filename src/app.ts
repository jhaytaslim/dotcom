import config from 'config'
import { nanoid } from 'nanoid'
import { version } from '../package.json'

import controller from './controller'
import { app, httpServer} from './startup'
import { badWords } from './utils/data'

const port = config.get<number>('port')
const host = config.get<string>('host')

app.use('/', controller)

httpServer.listen(port, host, () => {
  badWords['dot'] = {value: 'dot', _id: 'dot'};
  badWords['com'] = {value: 'com', _id: 'com'};

  console.info(`🚀 Server version ${version} is listening 🚀`)
  console.info(`http://${host}:${port}`)

})
