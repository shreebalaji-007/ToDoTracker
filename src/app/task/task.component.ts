import { Component, OnInit } from '@angular/core';

interface Task {
  title: string;
  status: string;
  dueDate?: Date;
  priority?: 'high' | 'normal' | 'urgent';
}

@Component({
  selector: 'app-tasks',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
    this.updateTaskCounts();
  }

  totalTasks = 0;
  completedTasks = 0;
  todoTasks = 0;
  inprogressTasks = 0;
  tasks: Task[] = [];
  selectedTasks: Task[] = [];
  selectedTasksLabel = '';

  constructor() { }

  ngOnInit(): void {
  }

  addTask(title: string, dueDate?: string, priority?: string): void {
    if (title.trim() === '') {
      alert('Empty task cannot be created');
      return;
    }
    if (this.tasks.some(task => task.title === title)) {
      alert('Task already created');
      return;
    }
    const status = 'todo';
    let taskDueDate: Date;
    if (dueDate) {
      taskDueDate = new Date(dueDate);
      if (taskDueDate < new Date()) {
        taskDueDate = new Date();
      }
    } else {
      taskDueDate = new Date();
    }
    const taskPriority = priority ? priority.toLowerCase() as 'high' | 'normal' | 'urgent' : 'normal';
    const task: Task = { title, status, dueDate: taskDueDate, priority: taskPriority };
    this.tasks.push(task);
    this.updateTaskCounts();
  }

  updateTaskCounts(): void {
    this.totalTasks = this.tasks.length;
    this.completedTasks = this.tasks.filter(task => task.status === 'completed').length;
    this.todoTasks = this.tasks.filter(task => task.status === 'todo').length;
    this.inprogressTasks = this.tasks.filter(task => task.status === 'inprogress').length;
  }

  clearTasks(): void {
    this.tasks = this.tasks.filter(task => task.status !== 'completed');
    this.updateTaskCounts();
    this.showTasks('todo');
  }

  moveTaskToStatus(task: Task, status: string): void {
    const taskIndex = this.tasks.findIndex(t => t.title === task.title);
    if (taskIndex !== -1) {
      this.tasks[taskIndex].status = status;
      this.updateTaskCounts();
      this.showTasks(status);
    }
  }

  showTasks(status: string): void {
    switch (status) {
      case 'total':
        this.selectedTasks = this.tasks;
        this.selectedTasksLabel = 'Total Tasks';
        break;
      case 'completed':
        this.selectedTasks = this.tasks.filter(task => task.status === 'completed');
        this.selectedTasksLabel = 'Completed Tasks';
        break;
      case 'todo':
        this.selectedTasks = this.tasks.filter(task => task.status === 'todo');
        this.selectedTasksLabel = 'Todo Tasks';
        break;
      case 'inprogress':
        this.selectedTasks = this.tasks.filter(task => task.status === 'inprogress');
        this.selectedTasksLabel = 'In Progress Tasks';
        break;
    }
  }

}