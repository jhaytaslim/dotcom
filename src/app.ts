import config from 'config'
import logger from './utils/logger'
import { version } from '../package.json'

import controller from './controller'
import { app, httpServer} from './startup'

const port = config.get<number>('port')
const host = config.get<string>('host')

app.use('/', controller)

httpServer.listen(port, host, () => {
  logger.info(`🚀 Server version ${version} is listening 🚀`)
  logger.info(`http://${host}:${port}`)

})
