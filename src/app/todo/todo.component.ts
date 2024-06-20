import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos!: Observable<Todo[]>;
  displayedColumns: string[] = ['title', 'description', 'actions'];
  
  constructor(private todoService: TodoService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todos = this.todoService.getTodoByUserId();
  }

  addTodoDialog(): void {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '600px',
      data: { title: '', description: '' }
    });

    dialogRef.componentInstance.closed.subscribe(() => {
      alert("Saved successfully.");
      this.getTodos(); // Refresh todos after dialog is closed
    });
  }

  editTodoDialog(todo: Todo): void {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '600px',
      data: { id: todo.id, title: todo.title, description: todo.description }
    });

    dialogRef.componentInstance.closed.subscribe(() => {
      alert("Saved successfully.");
      this.getTodos(); // Refresh todos after dialog is closed
    });
  }

  deleteTodo(todo: Todo): void {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(todo.id).subscribe(() => {
        this.getTodos();
      });
    }
  }

  navigateToTasks(todoId: string): void {
    this.router.navigate(['/tasks', todoId]); // Navigate to TaskComponent with todoId as parameter
  }
}