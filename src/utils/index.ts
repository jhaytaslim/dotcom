import { ResponseBody } from './data'

const JsonResponse = (
  res: any,
  status: number,
  msg: string,
  data: any = null,
  meta: any = null
) => {
  const body: ResponseBody = {
    msg: '',
    data: null,
    meta: {
      total: 1,
      pagination: {
        pageSize: 1,
        page: 1
      }
    }
  }

  if (data) {
    body.data = data
  }
  if (meta) {
    body.meta = meta
  } else {
    delete body.meta
  }

  if (typeof msg === 'string') {
    body.msg = msg
  }
  res.status(status ?? 200).send(body)
  return
}

const SuggestWords = (value: string) =>{
  let arr = []

  for (let i=0; i<20; i++){
    arr.push(`${value}${i%2==0? i : `_${i}`}`)
  }
  return arr;
}

export  {
  JsonResponse,
  SuggestWords
}
