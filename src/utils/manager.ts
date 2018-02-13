import request from './request'

export interface Model {
  id: number
}

type RightResult<T> = {
  success: true
  data: T
}

type ErrorResult = {
  success: false
  message: string
}

export type Result<T> = RightResult<T> | ErrorResult

export class Manager<T extends Model> {

  private path: string

  constructor(path: string) {
    this.path = path
  }

  request(path: string, init?: RequestInit) {
    return request(path, init)
  }

  findAll(query?: string): Promise<Result<T[]>> {
    if (query) {
      return this.request(`${this.path}?${query}`)
    } else {
      return this.request(this.path)
    }
  }

  getOne(id: number): Promise<Result<T>> {
    return this.request(`${this.path}/${id}`)
  }

  addOne(t: T): Promise<Result<T>> {
    return this.request(this.path, {method: 'post', body: JSON.stringify(t)})
  }

  delOne(id: number): Promise<Result<T>> {
    return this.request(`${this.path}/${id}`, {method: 'delete'})
  }

  update(t: T): Promise<Result<T>> {
    return this.request(`${this.path}/${t.id}`, {method: 'post', body: JSON.stringify(t)})
  }

}
