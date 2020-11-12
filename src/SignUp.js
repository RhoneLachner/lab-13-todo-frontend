import React, { Component } from 'react';
import request from 'superagent';

export default class SignUp extends Component {

    state = {
        email: '',
        password: '',
        loading: false,
    }

        handleSubmit = async (e) => {
            e.preventDefault();

            console.log(this.state);

            this.setState({ loading:true })
            const user = await request
                .post('https://immense-taiga-40019.herokuapp.com/auth/signup')
                .send(this.state);

            this.setState({ loading:false })

            this.props.changeTokenAndUserName(user.body.email, user.body.token);

            this.props.history.push('/api/todos');
        }

    render() {
        return (
            <div>

                <form onSubmit={this.handleSubmit}>
                    <h2>Welcome! <br/> Sign up here with your email, and create a unique password.</h2>
                    <label>
                        Email:
                        <input 
                        onChange={(e) => this.setState({ email: e.target.value })}
                        value={this.state.email} />
                    </label>
                    <label>
                        Password:
                        <input 
                        onChange={(e) => this.setState({ password: e.target.value })}
                        value={this.state.password} type="password"/>
                    </label>

                    {
                        this.state.loading 
                        ? 'Loading...'
                        : <button>
                            sign up
                        </button>
                    }
                    
                </form>
                
            </div>
        )
    }
}
