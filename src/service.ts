import { convertObjectToArray, SuggestWords } from './utils'
import { BadWord, badWords, Result, User, users } from './utils/data'
import { validateRegister } from './utils/validate'

const checkUsername = (username: string): Result => {
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
  const userExisting = (<Array<User>>convertObjectToArray(users)).find(
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

export { checkUsername }
