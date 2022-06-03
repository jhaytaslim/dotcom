import express from 'express'
import { nanoid } from 'nanoid'
import { version } from '../package.json'
import { BadWord, badWords, User, users, Result } from './utils/data'
import { convertObjectToArray, JsonResponse, SuggestWords } from './utils'
import { validateRegister } from './utils/validate'
import { checkUsername } from './service'
const router = express.Router()



router.get('/', (_, res) =>
  res.send(`Server is up and running version ${version}`)
)

router.post('/register', (req, res, next) => {
  try {
    let result = checkUsername(req.body.username)
    if (result.found === false) {
      result = {
        found: false,
        data: SuggestWords(req.body.username)
      }

      return JsonResponse(res, 400, 'username invalid', result)
    }

    const _id = nanoid()
    users[_id] = { ...req.body, _id }
    return JsonResponse(res, 200, `User added successfully`)
  } catch (err) {
    return JsonResponse(res, 500, 'Server Error')
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
