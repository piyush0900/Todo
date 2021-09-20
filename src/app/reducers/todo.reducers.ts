import { TodoActionTypes } from '../shared/enum/todo-action-types-enum';
import { ActionParent } from '../actions/todo.actions';
import { Todo } from '../models/Todo'

export const initialState: Todo[] = [
    {date:'11/10/1991',name:'abc',status:'active'},
    {date:'11/10/1991',name:'xyz',status:'active'},
    {date:'11/10/1991',name:'df',status:'inactive'},
]
localStorage.setItem("todoCollection", JSON.stringify(initialState));
export function TodoReducer (state = initialState, action: ActionParent){
    let todo;
    switch(action.type){
        case TodoActionTypes.Add:
            let todo = JSON.parse(localStorage.getItem("todoCollection"));
            todo.push({
                date: action.payload.date,
                name: action.payload.name,
                status: action.payload.status,
            });
            localStorage.setItem("todoCollection", JSON.stringify(todo));
            return JSON.parse(localStorage.getItem("todoCollection"));
        case TodoActionTypes.Update:
            let updatetodo = JSON.parse(localStorage.getItem("todoCollection"));
            updatetodo[action.payload.index].date = action.payload.date;
            updatetodo[action.payload.index].name = action.payload.name;
            updatetodo[action.payload.index].status = action.payload.status;
            localStorage.setItem("todoCollection", JSON.stringify(updatetodo));
            return JSON.parse(localStorage.getItem("todoCollection"));
        case TodoActionTypes.Remove:
            let deletetodo = JSON.parse(localStorage.getItem("todoCollection"));
            deletetodo.splice(action.payload.index, 1);
            localStorage.setItem("todoCollection", JSON.stringify(deletetodo));
            return JSON.parse(localStorage.getItem("todoCollection"));
        default: return JSON.parse(localStorage.getItem("todoCollection"));
    }
}