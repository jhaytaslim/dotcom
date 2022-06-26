interface User {
  name: string
  _id: string
  username: string
}
interface BadWord {
  value: string
  _id: string
}
interface ResponseBody {
  msg: string
  data: any
  meta?: {
    total: number
    pagination: {
      pageSize: number
      page: number
      // currentPage: 1,
    }
  }
}

interface Result {
  found: boolean
  data?: string[]
}

interface CreateUserReq {
  firstName: string
  lastName: string
  username: string
  // email: string
  password: string
  confirmPassword: string
  referrerID: string
}

interface CreateUserRes {
	uid:   string 
	token: string 
  verifyUrl: string 
  clientSecret: string
}

// const result: Result<boolean,string[]> ={};
const users: Record<string, User> = {}
const badWords: Record<string, BadWord> = {}

export { users, badWords, ResponseBody, User, BadWord, Result, CreateUserReq, CreateUserRes  }
