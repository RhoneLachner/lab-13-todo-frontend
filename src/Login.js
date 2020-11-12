import React, { Component } from 'react';
import request from 'superagent';

export default class Login extends Component {

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
                .post('https://immense-taiga-40019.herokuapp.com/auth/signin')
                .send(this.state);

            this.setState({ loading:false })

            this.props.changeTokenAndUserName(user.body.token, user.body.email);

            this.props.history.push('/todos');
        }

    render() {
        return (
            <div>

                <form onSubmit={this.handleSubmit}>
                    <h2>Welcome back! <br/> Please log back in here. </h2>
                    
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
                            log in
                        </button>
                    }

                    <h4>Forgot your password? We did too. Please start over at the sign up page. </h4>

                </form>
                
            </div>
        )
    }
}
