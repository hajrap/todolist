import React, { Component } from 'react';
import './index.css'; 


class TodoHeader extends Component {
  render() {
    return (
      <div className="TodoHeader">
          
       <h3>Todo List</h3>
       <a href="#">Clear</a>
      </div>
    );
  }
}

export default TodoHeader;
