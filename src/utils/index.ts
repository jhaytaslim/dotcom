import { BadWord, badWords, ResponseBody } from './data'

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

const SuggestWords = (value: string) => {
  let arr = []
  let i = 0
  while (arr.length < 10) {
    const str = `${value}${i % 2 == 0 ? i : `_${i}`}`
    const bad = <BadWord>(
      (<Array<BadWord>>convertObjectToArray(badWords)).find(
        item => str.indexOf(item.value) !== -1
      )
    )

    if (bad == null) continue
    arr.push(str.replace(bad.value, ''))
    i++
    if (i === 100) break
  }

  return arr
}

const convertObjectToArray = (object: any) => {
  return [...Object.values(object)]
}

export { JsonResponse, SuggestWords, convertObjectToArray }
