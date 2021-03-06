import React, { Component } from 'react'
import {
  BrowserRouter as Router, 
  Route, 
  Switch,
  Link,
} from "react-router-dom";
import './App.css';
import Login from './Login.js';
import SignUp from './SignUp.js';
import Home from './Home.js';
import Todos from './Todos.js';
import PrivateRoute from './PrivateRoute.js';


export default class App extends Component {

  state = {
    username: localStorage.getItem('USERNAME') || '',
    token: localStorage.getItem('TOKEN') || '',
  }

  changeTokenAndUserName = (password, username) => {
    localStorage.setItem('TOKEN', password);
    localStorage.setItem('USERNAME', username);

    this.setState({
      username: username,
      token: password
    })
  }


  logOut = () => {
    localStorage.setItem('TOKEN', '');
    localStorage.setItem('USERNAME', '');

    this.setState({
      username: '',
      token: ''
    })

  }


render() {
  return ( 
    <div className="App">
      
      <Router>
          <ul>
            {
            this.state.token 
            ? <div>
             {this.state.username}
              <button onClick={this.logOut}>Log out</button>
            </div>
          : <>
           <Link to="/login"><div>log in</div></Link>
            <Link to="/signup"><div>sign up</div></Link>
            </>}
          </ul>
          <Switch>
            <Route exact path='/' render={(routerProps) => <Home {...routerProps} />} />
            <Route exact path='/login' render={(routerProps) => 
                <Login 
                  {...routerProps} 
                  changeTokenAndUserName={this.changeTokenAndUserName} 
              />
              } 
            />
            <Route 
              exact 
              path='/signup' 
              render={(routerProps) => 
                  <SignUp  
                    {...routerProps} 
                    changeTokenAndUserName={this.changeTokenAndUserName} 
                    />
                } 
              />
            <PrivateRoute 
              token={this.state.token} 
              exact 
              path='/todos' 
              render={(routerProps) => <Todos {...routerProps} token={this.state.token} />} />

          </Switch>
        </Router>
    </div>
  );
};

}
