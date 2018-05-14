import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom';
import CustomerList from './CustomerList.js';
import Calendar from './Calendar.js';
import TrainingList from './TrainingList.js';
import Private from './Private.js';
import FrontPage from './FrontPage.js'; 
import { firebaseAuth } from './config';
import Login from './Login';
import Navigator from './Navigator';
const PrivateRoute = ({ component: Component, ...rest, isAuthenticated }) => (
    <Route {...rest} render={props => (
        isAuthenticated ? (
            <Component {...props} />
        ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}
                />
            )
    )} />
)

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { user: null, isAuthenticated: false };
    }
    componentDidMount() {
        firebaseAuth().onAuthStateChanged((user) => {
            if (user && user.emailVerified) {
                this.setState({ user: user, isAuthenticated: true });
            }
            else {
                this.setState({ user: null, isAuthenticated: false });
            }
        });
    }
    logout = () => {
        return firebaseAuth().signOut()
    }  
    render() {
        let logLink = null;
        if (this.props.isAuthenticated) {
            logLink = <button className="btn btn-default btn-link" onClick={this.logout} >Logout</button>;
        } 
        return <div>
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Personal Trainer Gym</h1>
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <BrowserRouter>
                    <div>
                        <Navigator isAuthenticated={this.state.isAuthenticated} />
                        
                            
                            

                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route exact path="/" component={FrontPage} />
                            <Route  path="/calendar" component={Calendar} />
                            <Route  path="/TrainingList" component={TrainingList} />
                            <Route  path="/CustomerList" component={CustomerList} />
                            <PrivateRoute isAuthenticated={this.state.isAuthenticated} path="/Private" component={Private} />
                            <Route render={() => <h1>Page not found</h1>} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        </div>
    }
}

export default App;
