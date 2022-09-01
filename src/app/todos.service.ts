import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, delay } from "rxjs/operators";

export interface ITodo {
    completed: boolean
    title: string
    id?: any
}

@Injectable({providedIn: 'root'})
export class TodosService {
    constructor(public http: HttpClient) {}

    addTodo(todo: ITodo): Observable<ITodo> {
        return this.http.post<ITodo>('https://jsonplaceholder.typicode.com/todos', todo, {
            headers: new HttpHeaders({
                'MyCustomHeader': Math.random().toString()
            })
        })
    }

    fetchTodos(): Observable<ITodo[]> {
        let params = new HttpParams();
        params = params.append('_limit', '4')
        params = params.append('custom', 'any')
        return this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos?', {
            params
            // params: new HttpParams().set('_limit', '10')
        })
            .pipe(
                delay(500),
                catchError(error => {
                    return throwError(error)
                })
            )
    }

    removeTodo(id: number): Observable<void>{
        return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`)
    }

    completeTodo(id: number): Observable<ITodo> {
        return this.http.put<ITodo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            completed: true
        })
    }
}