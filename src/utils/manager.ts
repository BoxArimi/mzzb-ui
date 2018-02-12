import request from './request';

export interface Manager<T> {
  findAll: (query?: string) => Promise<T[]>;
  getOne: (id: number) => Promise<T>;
  addOne: (t: T) => Promise<T>;
  delOne: (id: number) => Promise<T>;
  update: (t: T) => Promise<T>;
}

export class ManagerImpl<T> implements Manager<T> {

  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  request(path: string, init?: RequestInit) {
    return request(path, init);
  }

  findAll(query?: string) {
    if (query) {
      return this.request(`${this.path}?${query}`);
    } else {
      return this.request(this.path);
    }
  }

  getOne(id: number) {
    return this.request(`${this.path}/${id}`);
  }

  addOne(t: T) {
    return this.request(this.path, {method: 'post', body: JSON.stringify(t)});
  }

  delOne(id: number) {
    return this.request(`${this.path}/id`, {method: 'delete'});
  }

  update(t: T) {
    return this.request(`${this.path}/id`, {method: 'post', body: JSON.stringify(t)});
  }

}
