import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  todoId!: string | null;
  todo!: Observable<Todo>;
  tasks!: Observable<Task[]>;
  displayedColumns: string[] = ['name', 'description', 'dueDate', 'priority', 'status', 'actions'];

  constructor(private taskService: TaskService, private dialog: MatDialog,
    private route: ActivatedRoute, private todoService: TodoService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.todoId = params.get('todoId'); // Get the todoId from route parameters
      this.getTodo(); // Load todo information based on todoId
      this.getTasks(); // Load tasks based on todoId
    });
  }

  getTasks(): void {
    if(this.todoId != null){
      this.tasks = this.taskService.getTasksByTodoId(this.todoId);
    }
  }

  getTodo(): void {
    if(this.todoId != null){
      this.todo = this.todoService.getTodoById(this.todoId);
    }
  }

  addTaskDialog(task?: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '600px',
      data: { name: '', dueDate: new Date(), description: '', priority: '', status: '', todoId: this.todoId }
    });

    dialogRef.componentInstance.closed.subscribe(() => {
      alert("Saved successfully.");
      this.getTasks(); // Refresh todos after dialog is closed
    });
  }

  editTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '600px',
      data: {id: task.id, name: task.name, dueDate: task.dueDate, description: task.description, priority: task.priority, status: task.status, todoId: this.todoId }
    });

    dialogRef.componentInstance.closed.subscribe(() => {
      alert("Saved successfully.");
      this.getTasks(); // Refresh todos after dialog is closed
    });
  }

  deleteTask(task: Task): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(task.id).subscribe(() => {
        this.getTasks(); // Refresh tasks after deleting
      });
    }
  }
}