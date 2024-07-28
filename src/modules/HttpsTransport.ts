enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type Options = {
  headers?: { [key: string]: string }
  data?: { [key: string]: string }
  timeout?: number
  method: METHODS
}

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

class HTTPTransport {
  get = (url: string, options: Options) => {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout)
  }

  put = (url: string, options: Options) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout)
  }

  post = (url: string, options: Options) => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout)
  }

  delete = (url: string, options: Options) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)
  }

  request = (url: string, options: Options, timeout: number = 5000) => {
    const { data, headers, method } = options

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

      if (method === METHODS.GET || !data) {
        xhr.send()
      } else {
        xhr.send(data as any)
      }
    })
  }
}
