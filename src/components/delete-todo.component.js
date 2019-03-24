import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class DeleteTodo extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    
    delete() {
         axios.delete('http://localhost:4000/todos/delete/'+this.props.match.params.id)
            .then(console.log('Todo deleted'))
            .catch(err => console.log(err));
        
        this.props.history.push('/');
    }
    
    render() {
        return(
            <div>
                <h3 align="center">Delete Todo</h3>
                    <div>
                        <p>Todo will be permanently deleted. Do you wish to continue?:</p>
                        <button className="btn btn-success" onClick={this.delete}>Yes. I confirm. &raquo;</button>&nbsp;
                        <Link to={"/"} className="btn btn-danger">No. Take me back. &times;</Link>
                        <i className="glyphicon glyphicon-th-large"></i>
                    </div>
            </div>
        )
    }
}