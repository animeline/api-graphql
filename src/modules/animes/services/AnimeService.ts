import { injectable, inject } from 'tsyringe';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class AnimeService {
  public baseURL: string;

  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {
    this.baseURL = 'https://appanimeplus.tk';
  }

  public async findAll(page: number, limit: number, options = {}) {
    const data = await this.request(options);

    if (data === null) return new Error('Data not found.');

    const total = data.length;
    const totalPages = Math.ceil(total / limit);
    
    console.log(this.cacheProvider);

    return {
      page,
      perPage: limit,
      total,
      totalPages,
      data: data.slice(page * limit - limit, page * limit),
    };
  }

  public async request(queryParams = {}) {
    const params = new URLSearchParams(queryParams);

    return fetch(
      this.baseURL + '/api-animesbr-10.php' + `?${params.toString()}`,
    )
      .then(response => response.json())
      .then(data => (data ? data : null))
      .catch(err => new Error(err));
  }
}

export default AnimeService;
