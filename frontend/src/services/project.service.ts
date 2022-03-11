import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Project } from '../models/project';

@Injectable()
export class ProjectService {
    url:string;
    constructor(
        private _http: HttpClient
    ) { 
        this.url = Global.url;
    }

    saveProject(project:Project):Observable<any>{
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'api/save-project', params, {headers: headers});
    }

    getProjects():Observable<any>{
        return this._http.get(this.url + 'api/get-projects');
    }

    getProject(id:any):Observable<any>{
        return this._http.get(this.url + 'api/get-project/' + id);
    }

    deleteProject(id:any):Observable<any>{
        return this._http.delete(this.url + 'api/delete-project/' + id);
    }

    updateProject(project:Project):Observable<any>{
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let id = project._id;
        return this._http.put(this.url + 'api/update-project/' + id, params, {headers: headers});
    }
    
}