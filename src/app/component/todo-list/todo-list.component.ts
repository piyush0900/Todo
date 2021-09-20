import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Todo} from '../../models/Todo'
import { Observable } from 'rxjs'
import { select,Store } from '@ngrx/store'
import { Router } from '@angular/router';
import { NgbDateStruct,NgbDateParserFormatter, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { TodoAdd, TodoRemove, TodoUpdate } from 'src/app/actions/todo.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos:any;
  isAdd:boolean=false;
  isUpdate:boolean=false;
  dateSelected: NgbDateStruct;
  taskName:string;
  selectedValue:any;
  status:string = 'active';
  constructor(private store: Store<{todos: Todo[]}>,public router: Router) { 
    store.pipe(select('todos')).subscribe(values =>{
      this.todos = values;
    })
  }

  ngOnInit(): void {
  }
  add(){
    this.isAdd = true;
  }
  addTodo(){
    // const newTodo = new Todo();
    let newTodo =
    {
      date: this.dateSelected,
      name: this.taskName,
      status: this.status
    };
    this.store.dispatch(new TodoAdd(newTodo));
    this.taskName = '';
    this.status = 'active'
    this.isAdd = false;
  }
  populateTodo(todo:Todo,i){
    this.dateSelected = todo.date;
    this.taskName = todo.name;
    this.status = todo.status;
    this.selectedValue = i;
    this.isAdd = true;
    this.isUpdate = true;
  }
  updateTodo(){
    let updateTodo = {
      date: this.dateSelected,
      name: this.taskName,
      status: this.status,
      index: this.selectedValue
    }
    this.store.dispatch(new TodoUpdate(updateTodo));
    this.isAdd = false;
    this.isUpdate = false;
  }
  deleteTodo(i){
    let r = confirm("Are you delete this record?");
    if (r == true) {
      let deleteTodo = {
        index: i
      }
      this.store.dispatch(new TodoRemove(deleteTodo));
    }
  }

}
