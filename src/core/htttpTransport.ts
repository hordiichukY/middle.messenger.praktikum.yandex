enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type DataT = Record<string, unknown>
type HeadersT = Record<string, string>
type MethodsT = 'GET' | 'POST' | 'PUT' | 'DELETE'

type OptionsT = {
  data?: DataT
  method?: MethodsT
  headers?: HeadersT
}

export class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2'
  protected endpoint: string

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`
  }

  public get<Response>(path: string): Promise<Response> {
    return this.request<Response>(`${this.endpoint}${path}`)
  }

  public post<Response>(path: string, options?: OptionsT): Promise<Response> {
    return this.request(`${this.endpoint}${path}`, {
      ...options,
      method: METHODS.POST,
    })
  }

  public put<Response>(path: string, options?: OptionsT): Promise<Response> {
    return this.request(`${this.endpoint}${path}`, {
      ...options,
      method: METHODS.PUT,
    })
  }
  public delete<Response>(path: string, options?: OptionsT): Promise<Response> {
    return this.request(`${this.endpoint}${path}`, {
      ...options,
      method: METHODS.DELETE,
    })
  }

  private request<Response>(
    url: string,
    options: OptionsT = { method: METHODS.GET },
    timeout = 5000
  ): Promise<Response> {
    const { headers = { accept: 'application/json' }, data, method } = options

    if (!method) {
      throw 'No method'
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.timeout = timeout
      xhr.withCredentials = true
      xhr.open(method, url)

      Object.entries({ ...headers }).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value)
      })

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response)
          } else {
            reject(xhr.response)
          }
        }
      }

      xhr.onabort = () => reject({ reason: 'abort' })
      xhr.onerror = () => reject({ reason: 'network error' })
      xhr.ontimeout = () => reject({ reason: 'timeout' })

      xhr.responseType = 'json'

      if (method === METHODS.GET || !data) {
        xhr.send()
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  }
}
