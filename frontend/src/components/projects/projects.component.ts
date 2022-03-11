import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  public projects:Array<Project>;
  public url:string;

  constructor(
    private _projectService: ProjectService
  ) { 
    this.projects = new Array<Project>();
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._projectService.getProjects().subscribe(
      response => {
        console.log(response);
        this.projects = response.projects;
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteProject(id:any){
    this._projectService.deleteProject(id).subscribe(
      response => {
        if(response.project){
          //this._router.navigate(['/inicio']);
          this.ngOnInit();
        }
      },
      err => {
        console.log(<any>err);
      }
    );
  }

}
