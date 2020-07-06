import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
// import { v4 as uuid } from 'uuid';
import axios from 'axios';

import './App.css';

class App extends Component {
  state = {
    todos: [
      // {
      //   id: uuid(),
      //   title: 'Take out the trash',
      //   completed: false
      // },
      // {
      //   id: uuid(),
      //   title: 'Dinner with wife',
      //   completed: true
      // },
      // {
      //   id: uuid(),
      //   title: 'Meeting with boss',
      //   completed: false
      // }
    ]
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=15')
      .then(res => this.setState({ todos: res.data }));
  }

  // Toggle Complete
  markComplete = (id) => {
    // console.log(id);
    this.setState({ todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    }) });
  }

  // Delete Todo
  delTodo = (id) => {
    // console.log(id);
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
    // this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] });
  }

  // Add Todo
  addTodo = (title) => {
    // console.log(title);
    // const newTodo = {
    //   id: uuid(),
    //   title,
    //   completed: false
    // }
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
      .then(res => this.setState({ todos: [...this.state.todos, res.data]}));
    // this.setState({ todos: [...this.state.todos, newTodo]});
  }

  render() {
    // console.log(this.state.todos);
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo}/>
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
              </React.Fragment>
            )} />

            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
