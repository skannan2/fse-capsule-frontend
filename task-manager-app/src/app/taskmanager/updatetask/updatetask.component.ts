import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/task.service';
import { Task } from '../../shared/task.model';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent implements OnInit {
  data: any;
  submitted = false;
  task: Task = new Task();


  constructor(private taskService: TaskService,     
    private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    let taskId = window.localStorage.getItem("editTaskId");

    this.taskService.getTaskById(+taskId)
      .subscribe( (res: any) => {
        this.task = res;
        console.log(this.task); 
      });
  }

  onSubmit() {
    this.task.startDate = this.datePipe.transform(this.task.startDate, 'MM/dd/yyyy');
    this.task.endDate = this.datePipe.transform(this.task.endDate, 'MM/dd/yyyy');
    this.taskService.updateTask(this.task)
        .subscribe(data => console.log(data), error => console.log(error));    
    this.submitted = true;
    this.router.navigate(['viewtask']);
  }

  goBack() {
    this.router.navigate(['viewtask']);
  }

}
