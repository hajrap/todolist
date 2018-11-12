import React,{Component} from 'react';
import "./index.css";
const API= 'http://localhost:9999/api/v1/';
class TodoItem extends Component{
    constructor(props)
    {
        super(props)  
    }

    render(){
        const {haserror,error,isLoaded,items} = this.props.itemstate;
        if(haserror){
            return(
                <div>{error.message}</div>
            )
        }
        else if(!isLoaded){
            return(
                <div>Loading...</div>  
            )
        }else{
        return(
            <div className="todoItem">
            {
                items.map(item =>
                    <li key={item.id} >
                    <input type="checkbox" name="todo-item"></input>
                    <textarea placeholder="Add Task.." value={item.text} readOnly={true}></textarea>
                    <a href="javascript:;" id={item.id} onClick={this.props.delete} >x</a>
                 </li>
                    )
            }
            </div>
        )
        }
    }
}
export default TodoItem;
