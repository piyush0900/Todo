import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'practical';
  isAdd:boolean=false;
  addTodo(){
    this.isAdd = true;
  }
}
