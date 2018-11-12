import React,{Component} from 'react';
import './index.css';
import TodoHeader from './TodoHeader';
import TodoItem from './TodoItem';
const API= 'http://localhost:9999/api/v1/';
class TodoList extends Component{
    constructor(props){
        super(props)
        this.state = {
            haserror:false,
            error: null,
            isLoaded: false,
            items: []
          };
        let text=this.props.text;
        this.onKeyPressHandler=this.onKeyPressHandler.bind(this);
        this.onClickHandler=this.onClickHandler.bind(this);
    }
    componentDidMount() {
        fetch(API+"items").then(res => res.json()).then(result => {
            this.setState({
               isLoaded: true,
              items: result.data
            });
            
          },
          error => {
            this.setState({
              haserror: true,
              error
            });
          });
          
      }
    onKeyPressHandler(e)
    {
      if(e.key==='Enter')
      {
      let text=e.target.value;
      e.target.value="";
        fetch(API + "items", {
          method: 'post',
          body: JSON.stringify({
            text
          }),
          headers: {
            'Accept': 'Application/json',
            'Content-Type': 'Application/json'
          }
        }).then(res => {
          if (res.status == 200) {
            var newItem = {
              id: "new",
              text: text,
              completed: true
            };
            this.setState((prevState) => {
              return {
                items: prevState.items.concat(newItem)
              };
            });
          }
        }).catch(err =>
          console.log(err.message));
        }

    }
    onClickHandler(e)
    {
      let id=e.target.id;
      this.setState((prevState) => {
        return {
          items: prevState.items.filter(item =>{
            return item.id !=id
          })
        };
      });
      return  fetch(API + "items/", {
           mode :'cors',
            method: 'delete',
            body: JSON.stringify({id: e.target.id}),
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods':'delete',
              'Content-Type': 'Application/json'
              
            }
          }).then(res => {
              console.log(res);
            if (res.status == 200) {

            }
          }).catch(err =>
            console.log(err.message));
          
    }
    render(){
        return(
            <div>
                <TodoHeader></TodoHeader>
                <TodoItem itemstate={this.state} delete={this.onClickHandler}></TodoItem>
                <textarea placeholder="Your next task...." value={this.props.text}
                onKeyPress={this.onKeyPressHandler}></textarea>
            </div>
        )
    }

}
export default TodoList;