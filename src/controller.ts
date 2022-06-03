import express from 'express'
import { nanoid } from 'nanoid'
import { version } from '../package.json'
import { BadWord, badWords, User, users, Result } from './utils/data'
import { JsonResponse } from './utils'
import { validateRegister } from './utils/validate'
const router = express.Router()

const convertObjectToArray = (object: any) => {
  return [...Object.values(object)]
}

router.get('/', (_, res) =>
  res.send(`Server is up and running version ${version}`)
)

router.post('/register', (req, res, next) => {
  try {
    let result: Result;
    const { error } = validateRegister(req.body)
    if (error) return JsonResponse(res, 400, error.details[0].message)
    //validate username for badWords
    const userWithBadWord =<BadWord> (<Array<BadWord>>convertObjectToArray(badWords)).find(
      item => req.body.username.indexOf(item.value) !== -1
    )

    if (userWithBadWord) return JsonResponse(res, 400, `Username cannot contain ${userWithBadWord.value}`)

    //validate username for badWords
    const userExisting = (<Array<User>>convertObjectToArray(users)).find(
      item => req.body.username == item.username
    )
    if (userExisting) return JsonResponse(res, 400, 'Word already exists')

    // suggest usernames

    const _id = nanoid()
    users[_id] = { ...req.body, _id }
    res.send({
      data: convertObjectToArray(users),
      msg: 'User added successfully'
    })
    return next()
  } catch (err) {

  }
})

router.post('/words/add', (req, res, next) => {
  try {
    const { word } = req.body
    const existing = (<Array<BadWord>>convertObjectToArray(badWords)).find(
      item => item.value == word
    )

    if (existing) return JsonResponse(res, 400, 'Word already exists')

    const _id = nanoid()
    badWords[_id] = { value: word, _id }

    return JsonResponse(res, 400, 'Word added successfully', badWords[_id])
  } catch (err) {
    return JsonResponse(res, 500, 'Server Error')
  }
})

router.get('/words', (req, res, next) => {
  try {
    return JsonResponse(
      res,
      200,
      `Resource fetched successfully`,
      <Array<BadWord>>convertObjectToArray(badWords)
    )
  } catch (err) {
    return JsonResponse(res, 500, 'Server Error')
  }
})

router.delete('/words/:wordId', (req, res, next) => {
  try {
    const _id = req.params.wordId
    delete badWords[_id]
    return JsonResponse(res, 200, `word deleted successfully`)
  } catch (err) {
    return JsonResponse(res, 500, 'Server Error')
  }
})

export default router
