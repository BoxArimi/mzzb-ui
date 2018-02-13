const header = 'X-CSRF-HEADER'
const token = 'X-CSRF-TOKEN'

function prepareCookies({credentials, ...props}: RequestInit) {
  if (!credentials) {
    credentials = 'include'
  }
  return {credentials, ...props}
}

function prepareCsrfToken({method = 'get', headers = {}, ...prors}: RequestInit) {
  const name = sessionStorage[header]
  const value = sessionStorage[token]
  if (name && value) {
    headers[name] = value
  }
  return {method, headers, ...prors}
}

function checkStatus(response: Response) {
  if (response.status < 200 || response.status > 300) {
    throw new Error(`服务器未正确响应: ${response.status}: ${response.statusText}`)
  }
  return response
}

function saveCsrfToken(response: Response) {
  const headers = response.headers
  sessionStorage[header] = headers.get(header)
  sessionStorage[token] = headers.get(token)
  return response
}

function parseToJSON(response: Response) {
  try {
    return response.json()
  } catch (error) {
    throw new Error(`解析JSON遇到错误: ${error.message}`)
  }
}

export default function request(url: string, props: RequestInit = {}) {
  props = prepareCookies(props)
  props = prepareCsrfToken(props)
  return fetch(url, props)
    .then(checkStatus)
    .then(saveCsrfToken)
    .then(parseToJSON)
    .catch(err => {
      return {success: false, message: err.message}
    })
}
