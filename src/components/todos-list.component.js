import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td className={ props.todo.todo_completed ? 'completed' : '' }>{ props.todo.todo_description }</td>
        <td className={ props.todo.todo_completed ? 'completed' : '' }>{ props.todo.todo_responsible }</td>
        <td className={ props.todo.todo_completed ? 'completed' : '' }>{ props.todo.todo_priority }</td>
        <td>
            <Link to={"/edit/" + props.todo._id} className="btn btn-primary">Edit</Link>&nbsp;
            <Link to={"/delete/" + props.todo._id} className="btn btn-danger">Delete</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {
    _isMounted = false;
    constructor(props) {
        
        super(props);
        this.state = {
            todos: []
        };
    }
    
    getTodos() {   
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                if(this._isMounted) {
                    this.setState({
                        todos: response.data
                    });
                }  
            })
            .catch(function(error){
                console.log(error);
            });
    }
    
    componentDidMount() {
        this._isMounted = true;
        this.getTodos();
    }
    
    componentDidUpdate() {
        this.getTodos(); 
    }
    
    componentWillUnmount() {
        this._isMounted = false;
    }

    todoList() {
        return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />;
        })
    }
    
    render() {
        return(
            <div>
                <h3>Todo List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}