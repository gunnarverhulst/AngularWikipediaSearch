import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { pluck } from 'rxjs/operators';

interface WikipediaResponse {
  query: {
    search: {
      pageid: number;
      title: string;
      snipped: string;
    } []
  }
}

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  constructor(private http: HttpClient) { }

  search(term: string) {
    /* return 'I am wikipedia search results'; */
    /* https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=space */
    return this.http.get<WikipediaResponse>('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        list: 'search',
        utf8: '1',
        srsearch: term,
        origin: '*'
      }
    }).pipe(
      pluck('query', 'search')
    );
  }
}
