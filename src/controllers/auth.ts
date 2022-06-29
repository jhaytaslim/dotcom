import express from 'express'
import { nanoid } from 'nanoid'
import { version } from '../../package.json'
import { BadWord, badWords, User, users, Result } from '../utils/data'
import { convertObjectToArray, generateToken, JsonResponse, SuggestWords } from '../utils'

import { validateLogin, validateRegister } from '../validate/user'
import UserService from '../services/user'
import config from 'config'

const router = express.Router()

router.get('/', (_, res) =>
  res.send(`Server is up and running version ${version}`)
)

router.post('/register', async (req, res, next) => {
  try {
    const { error } = validateRegister(req.body)
    if (error) return JsonResponse(res, 400, error.details[0].message)

    const userService = new UserService();
    console.log('res:......')
    // send body to service
    let result = await  userService.create(req.body)
    console.log('res:', result)
    if (!result) {
      // result = {
      //   found: false,
      //   data: SuggestWords(req.body.username)
      // }

      return JsonResponse(res, 400, 'username invalid', result)
    }

    // const verificationSession = await userService.verifyStripe({id: result.uid})

    // check if verificationSession was created
    console.log('res:', result)
    // await userService.update({id: result._id, verificationSession})
    const resp = {
      uid: result?._id,
      // verifyUrl: verificationSession?.url,
      // clientSecret: verificationSession?.client_secret,
      // token: generateToken(result)
    }
    res.header('x-auth-token', generateToken(result))

    return JsonResponse(res, 200, `User added successfully`, resp)
  } catch (err: any) {
    console.log('err: ', err)
    return JsonResponse(res, err.code || 500, err.msg || 'Server Error')
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { error } = validateLogin(req.body)
    if (error) return JsonResponse(res, 400, error.details[0].message)

    const userService = new UserService();
    console.log('res:......')
    // send body to service
    let result = await  userService.find({email: req.body.email})
    console.log('res:', result)
    if (!result) {
      // result = {
      //   found: false,
      //   data: SuggestWords(req.body.username)
      // }

      return JsonResponse(res, 400, 'Account invalid', result)
    }

    // const verificationSession = await userService.verifyStripe({id: result.uid})

    // check if verificationSession was created
    console.log('res:', result)
    // await userService.update({id: result._id, verificationSession})
    const resp = {
      uid: result?._id,
      // verifyUrl: verificationSession?.url,
      // clientSecret: verificationSession?.client_secret,
      // token: generateToken(result)
    }

    res.header('x-auth-token', generateToken(result))
    return JsonResponse(res, 200, `User added successfully`, resp)
  } catch (err: any) {
    console.log('err: ', err)
    return JsonResponse(res, err.code || 500, err.msg || 'Server Error')
  }
})

router.get('/verify/:id/stripe', async (req, res, next) => {
  try {
    const userService = new UserService();

    const verificationSession = await userService.verifyStripe({id: req.params.id})

    await userService.update({id: req.params.id, verificationSession})

    return JsonResponse(
      res,
      200,
      'Retrieved successfully',
      {
        verifyUrl: verificationSession.url,
        clientSecret: verificationSession.client_secret
      }
    )
  } catch (err:any) {
    console.info(`🚀 Error: ${err} `)
    return JsonResponse(res, err.code || 500, err.msg || 'Server Error')
  }
})

router.get('/verify/:id/stripe/retrieve', async (req, res, next) => {
  try {
    const userService = new UserService();
    // Create the session.
    const user = await userService.get({id: req.params.id})
    const verificationSession = await userService.retrieveVerifyStripe(user.verificationSession.id)

    return JsonResponse(
      res,
      200,
      'Retrieved successfully',
      {
        verifyUrl: verificationSession.url,
        clientSecret: verificationSession.client_secret
      }
    )
  } catch (err:any) {
    console.info(`🚀 Error: ${err} `)
    return JsonResponse(res, err.code || 500, err.msg || 'Server Error')
  }
})

router.get('/verify/stripe/callback', async (req, res, next) => {
  try {
    // console.log('query: ', req.query)
    // console.log('params: ', req.params)
    console.log('req: ', req.body,req.query,req.params)
    return JsonResponse(res, 200, 'Success')
  } catch (err) {
    console.info(`🚀 Error: ${err} `)
    return JsonResponse(res, 500, 'Server Error')
  }
})

export default router
