import React, { Component } from 'react'
import request from 'superagent';

export default class Todos extends Component {

    state = {
        todos: [],
        task: '',
        completed: false,
        loading: false
    }

    componentDidMount = async () => {
        await this.fetchTodos()
    }


    fetchTodos = async () => {
        const { token } = this.props;

        await this.setState({ loading: true });
        const response = await request.get('https://immense-taiga-40019.herokuapp.com/api/todos')
        .set('Authorization', token)

        await this.setState({ plants: response.body, loading: false })
    }

    handleSubmit = async (e) => {
        const {  task, completed } = this.state;
        const { token } = this.props;

        e.preventDefault();

        const newTodo = {
            task: task,
            completed: completed,
        };

        await this.setState({ loading: true });

        await request.post('https://immense-taiga-40019.herokuapp.com/api/todos')
        .send(newTodo)
        .set('Authorization', token)  ;

        await this.fetchTodos();
    }


    handleCompletedClick = async (someId) => {
        const { token } = this.props;

        // let's update a particular plant (we'll need its id)
        await request.put(`https://immense-taiga-40019.herokuapp.com/api/todos/${someId}`)
        .set('Authorization', token)  ;

        await this.fetchTodos();
    }


    render() {

        const {
            task,
            loading,
            todos,
        } = this.state;

        return (
            
                <div>
                Welcome to your list page!
                <form onSubmit={this.handleSubmit}>
                    <label>
                        
                        <input 
                        placeholder='enter new task name here'
                        type='string'
                            value={task} 
                            onChange={(e) => this.setState({ task: e.target.value })}
                        /> 
                        </label>

                        <button>
                            Add your task!
                        </button>
                </form>
                {
                    loading 
                        ? 'LOADING.' 
                        : todos.map(todo => <div key={`${todo.task}${todo.id}${Math.random()}`} style={{ 
                            textDecoration: todo.completed ? 'line-through' : 'none' }
                        }>
                         {todo.task}
                        {
                            todo.completed ? '' : <button 
                            // if you're ever onClicking inside of a map, you might need to make an anonymous function like this:
                                onClick={() => this.handleCompletedClick(todo.id)}>
                                Mark task as Comleted
                            </button>
                        }
                        </div>)
                }

                </div>
        )
    }
}

