import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkResponse , Work } from '../interfaces/WorkResponse'
import { TypeResponse , Type} from '../interfaces/TypeResponse'
import { DoiResponse } from '../interfaces/DoiResponse'
import { map, filter } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor(private _httpClient: HttpClient) { }


   getWorks( rows:number, offset:number ):Observable<Work[]>{
      return this._httpClient.get<WorkResponse>(`https://api.crossref.org/works?query=&rows=${rows}&offset=${offset}`)
        .pipe(
            map(response => response.message.items)
          )
  }

  getTypes():Observable<Type[]>{
   return this._httpClient.get<TypeResponse>(`https://api.crossref.org/types`)
    .pipe(
        map(response => response.message.items)
      )
  }

  filterByType(type:string, query:string, rows:number , offset:number):Observable<Work[]>{
    if(type === ''){

      return this._httpClient.get<WorkResponse>(`https://api.crossref.org/works?query=${query}&rows=${rows}&offset=${offset}`)
        .pipe(
          map(response => response.message.items)  
        )

    }else{

      return this._httpClient.get<WorkResponse>(`https://api.crossref.org/types/${type}/works?query=${query}&rows=${rows}&offset=${offset}`)
      .pipe(
        map(response => response.message.items)
      )  
    }
  }

  getWork(doi:string):Observable<Work>{
    return this._httpClient.get<DoiResponse>(`https://api.crossref.org/works/${doi}`)
    .pipe(
        map(response => response.message)
      )  
  }

}
