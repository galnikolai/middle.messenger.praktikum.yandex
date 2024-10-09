enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type Options =
  | {
      headers?: { [key: string]: string }
      data?: { [key: string]: string } | unknown
      timeout?: number
      method?: METHODS
      title?: string
      content_type?: string
    }
  | any

function queryStringify(data: { [key: string]: string }) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object')
  }

  return (
    '?' +
    Object.keys(data)
      .map((key) => {
        return `${key}=${data[key]}`
      })
      .join('&')
  )
}

type HTTPMethod = (url: string, options?: Options) => Promise<any>

export class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2'

  url: string
  constructor(url: string) {
    this.url = `${HTTPTransport.API_URL}${url}`
  }

  get: HTTPMethod = (url, options: Options = {}) =>
    this.request(this.url + url, { ...options, method: METHODS.GET }, options?.timeout)

  put: HTTPMethod = (url: string, options = {}) =>
    this.request(this.url + url, { ...options, method: METHODS.PUT }, options?.timeout)

  post: HTTPMethod = (url, options = {}) =>
    this.request(this.url + url, { ...options, method: METHODS.POST }, options?.timeout)

  delete: HTTPMethod = (url, options = {}) =>
    this.request(this.url + url, { ...options, method: METHODS.DELETE }, options?.timeout)

  request = (
    url: string,
    options: Options = { method: METHODS.GET, content_type: 'json' },
    timeout: number = 5000
  ) => {
    const { data, headers, method, content_type } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.open(method, `${url}${data && method == METHODS.GET ? queryStringify(data) : ''}`)

      if (headers?.length) {
        Object.keys(headers).map((key) => {
          xhr.setRequestHeader(key, headers[key])
        })
      }

      xhr.onload = function () {
        resolve(xhr)
      }

      xhr.onabort = reject
      xhr.onerror = reject

      xhr.timeout = timeout
      xhr.ontimeout = reject
      xhr.withCredentials = true
      xhr.responseType = 'json'

      if (method === METHODS.GET || !data) {
        xhr.send()
      } else {
        if (content_type === 'multipart/form-data') {
          xhr.send(data)
          return
        }

        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(data))
      }
    })
  }
}
