import {Route, Switch} from 'react-router-dom'
import Menu from "./core/Menu"
import Home from "./pages/Home"
import Register from "./components/Register"
import Login from './components/Login'


const MainRoute = () => {
    return (
        <div>
            <Menu/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/register" component={Register}/>
                <Route path='/login' component={Login}/>
            </Switch>
        </div>
    )
}

export default MainRoute;