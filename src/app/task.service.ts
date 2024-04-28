import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      name: 'Daily Exercise Routine',
      dueDate: new Date('2023-05-12'),
      tags: ['Health', 'Fitness']
    }
  ];

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  addTask(task: Task): void {
    this.tasks.push(task);
  }
}