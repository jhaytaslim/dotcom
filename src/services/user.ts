import mongoose from 'mongoose'
import { validateRegister } from '../validate/user'
import { convertObjectToArray, SuggestWords } from '../utils'
import {
  BadWord,
  badWords,
  Result,
  users,
  User as CUser,
  CreateUserReq,
  CreateUserRes
} from '../utils/data'
import User from '../models/user'
import config from 'config'

class UserService {
  /**
   * Create a Company account
   * @param {String} body
   * @param {Object} user
   */
  create (body: CreateUserReq): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const session = await mongoose.startSession()
      try {
        session.startTransaction()
        const exist = await User.findOne({ username: body.username })
        if (exist) {
          reject({ code: 400, msg: 'Account already exist.' })
          return
        }

        const user = new User(body)
        await user.save({ session: session })

        await session.commitTransaction()
        session.endSession()

        //const response =  <CreateUserRes>(<unknown>(user))
        resolve(user)
      } catch (error) {
        session.abortTransaction()
        console.log('error', error)
        reject({ code: 500, msg: 'Server Error' })
        return
      }
    })
  }

  /**
   * Create a Company account
   * @param {String} body
   * @param {Object} user
   */
   update (body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const session = await mongoose.startSession()
      try {
        session.startTransaction()
        console.log('body:', body)
        const user = await User.findOne({ _id: body.id })
        if (!user) {
          reject({ code: 400, msg: 'Account doesn"t exist.' })
          return
        }

        user.verificationSession = body.verificationSession

        await user.save({ session: session })

        await session.commitTransaction()
        session.endSession()

        resolve(user)
      } catch (error) {
        session.abortTransaction()
        console.log('error', error)
        reject({ code: 500, msg: 'Server Error' })
        return
      }
    })
  }

  get (body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const session = await mongoose.startSession()
      try {
        session.startTransaction()
        console.log('body:', body)
        const user = await User.findOne({ _id: body.id })
        if (!user) {
          reject({ code: 400, msg: 'Account doesn"t exist.' })
          return
        }

        resolve(user)
      } catch (error) {
        session.abortTransaction()
        console.log('error', error)
        reject({ code: 500, msg: 'Server Error' })
        return
      }
    })
  }
  /**
   * Create a Company account
   * @param {String} body
   * @param {Object} user
   */
  verifyStripe (body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const session = await mongoose.startSession()
      try {
        // Set your secret key. Remember to switch to your live secret key in production.
        // See your keys here: https://dashboard.stripe.com/apikeys
        const stripe = require('stripe')(config.get('stripeKey'))

        // In the route handler for /create-verification-session:
        // Authenticate your user.

        // Create the session.
        const verificationSession = await stripe.identity.verificationSessions.create(
          {
            type: 'document',
            return_url: 'https://www.bing.com/verify/stripe/callback',
            metadata: {
              user_id: body.id
            },
            options: {
              document: {
                allowed_types: ['id_card', 'driving_license']
              }
            }
          }
        )

        // Return only the client secret to the frontend.
        // const clientSecret = {
        //   client_secret: verificationSession.client_secret
        // }

        resolve(verificationSession)
      } catch (error) {
        session.abortTransaction()
        console.log('error', error)
        reject({ code: 500, msg: 'Server Error' })
        return
      }
    })
  }

  retrieveVerifyStripe (body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')

        const verificationSession = await stripe.identity.verificationSessions.retrieve(
          body
        )
        resolve(verificationSession)
      } catch (error) {
        console.log('error', error)
        reject({ code: 500, msg: 'Server Error' })
        return
      }
    })
  }

  checkUsername = (username: string): Result => {
    const { error } = validateRegister({ username })

    console.info(`🚀 badWords is/are :`, error)
    if (error)
      return {
        found: false,
        data: SuggestWords(username)
      }

    //validate username for badWords
    const userWithBadWord = <BadWord>(
      (<Array<BadWord>>convertObjectToArray(badWords)).find(
        item => username.indexOf(item.value) !== -1
      )
    )

    console.info(`🚀 userWithBadWord is/are :`, userWithBadWord)
    if (userWithBadWord)
      return {
        found: false,
        data: SuggestWords(username)
      }

    //validate username for badWords
    const userExisting = (<Array<CUser>>convertObjectToArray(users)).find(
      item => username == item.username
    )
    console.info(`🚀 userExisting is/are :`, userExisting)
    if (userExisting)
      return {
        found: false,
        data: SuggestWords(username)
      }

    return {
      found: true,
      data: []
    }
  }
}

export default UserService
