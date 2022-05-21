enum METHODS {
  GET = 'GET',
  POST = 'POST', 
  PUT = 'PUT', 
  DELETE = 'DELETE'
};

type DataT = Record<string, unknown>
type HeadersT = Record<string, string>

type OptionsT = {
  data?: DataT,
  timeout?: number,
  method: string,
  headers?: HeadersT
}


function queryStringify(data: DataT) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
}
  return Object.entries(data).map(([key, value]) => key + '=' + value).join('&');
}

export class HTTPTransport {
  get = (url: string, options: OptionsT) => {
    const { data } = options; 
    if(data) {
      url = `${url}?${queryStringify(data)}`; 
    }
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  };
  post = (url: string, options: OptionsT) => {
    return this.request(url, {...options, method: METHODS.POST}, options.timeout);
  };
  put = (url: string, options: OptionsT) => {
    return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
  };
  delete = (url: string, options: OptionsT) => {
    return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
  };

 
  request = (url: string, options: OptionsT, timeout = 5000) => {
    const {data, headers, method} = options;
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.timeout = timeout;
      xhr.open(method, url);
      
      xhr.onload = function(){
        resolve(xhr)
      }
      
      for(const header in headers) {
        xhr.setRequestHeader(header, headers[header])
      }
      
      xhr.onabort = reject; 
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      
      if(method === METHODS.GET || !data) {
        xhr.send();
      } else {
         xhr.send(JSON.stringify(data));
      }
    })
  };
}