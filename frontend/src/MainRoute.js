import {Route, Switch} from 'react-router-dom';
import Menu from "./core/Menu";
import Home from "./pages/Home";
import Register from "./components/Register";
import Login from './components/Login';
import UserList from './components/UserList';
import Profile from './components/Profile';


const MainRoute = () => {
    return (
        <div>
            <Menu/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/register" component={Register}/>
                <Route path='/login' component={Login}/>
                <Route path='/users' component={UserList}/>
                <Route path='/user/:userId' component={Profile}/>
            </Switch>
        </div>
    )
}

export default MainRoute;