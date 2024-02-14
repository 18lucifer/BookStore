import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})


export class ApiService {

  private usersUrl: string;

  constructor(private http : HttpClient) { }

  postBook(data : any){
    return this.http.post<any>("http://localhost:8190/Books/savebooks", data)
    .pipe(map((res:any)=>{
      // console.log("ggggggggggg")
      return res;
    }))
  }

  getBook(){
    return this.http.get<any>("http://localhost:8190/Books/book")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateBooks(data : any, bookid : string){
    return this.http.put<any>("http://localhost:8190/Books/books",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteBook(bookid : string){
    return this.http.delete<any>("http://localhost:8190/Books/book/"+bookid)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
