import {Route, Switch} from 'react-router-dom';
import Menu from "./core/Menu";
import Home from "./pages/Home";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import UserList from './components/user/UserList';
import Profile from './components/user/Profile';
import EditProfile from './components/user/EditProfile';
import PrivateRoute from './auth/PrivateRoute';


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
                <PrivateRoute path='/user/edit/:userId' component={EditProfile}/>
            </Switch>
        </div>
    )
}

export default MainRoute;