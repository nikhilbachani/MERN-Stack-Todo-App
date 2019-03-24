import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.js";
import "bootstrap/dist/js/bootstrap.min.js";

import TodosList from "./components/todos-list.component";
import EditTodo from "./components/edit-todo.component";
import CreateTodo from "./components/create-todo.component";
import DeleteTodo from "./components/delete-todo.component";
import logo from "./logo.svg";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
              <img src={logo} width="30" height="30" alt="logo" />
            </a>
            <Link to="/" className="navbar-brand">MERN-Stack Todo App</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Todo</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/" exact component={ TodosList } />
          <Route path="/edit/:id" component={ EditTodo } />
          <Route path="/create" component={ CreateTodo } />
          <Route path="/delete/:id" component={ DeleteTodo } />
        </div>
      </Router>
    );
  }
}

export default App;