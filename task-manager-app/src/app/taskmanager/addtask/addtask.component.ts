import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/task.service';
import { Task } from '../../shared/task.model';
import { Router } from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/format-datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css'],
  providers: [

  ]
})
export class AddtaskComponent implements OnInit {  
  task: Task = new Task();
  submitted = false;

  constructor(private taskService: TaskService,     
    private router: Router, private datePipe: DatePipe) {
        this.task.taskId=0;
        this.task.parentTaskId=0;
     }

  ngOnInit(): void {
    this.task.priority = 0;
  }


  onSubmit() {
    console.log(this.task.startDate);
    this.task.startDate = this.datePipe.transform(this.task.startDate, 'MM/dd/yyyy');
    this.task.endDate = this.datePipe.transform(this.task.endDate, 'MM/dd/yyyy');
    
    console.log(this.datePipe.transform(this.task.startDate, 'MM/dd/yyyy'));
    this.taskService.addTask(this.task)
        .subscribe(data => console.log(data), error => console.log(error));  
    
    this.clearFields();      
    this.submitted = true;
    
    this.router.navigate(['viewtask']);
  }  

  clearFields() {
    this.task.task = '';
    this.task.parentTask = '';
    this.task.priority = 0;
    this.task.startDate = '';
    this.task.endDate = '';
  }

}
