import React from "react";
import {BrowserRouter, Switch, Route, Router} from "react-router-dom";
import {createBrowserHistory} from "history";

//rotas 
import Login from './views/signin/SignIn';
import Main from './views/main/Main';
import GrCasa from './views/gr-em-casa/gr-em-casa';
import Schedule from './views/schedule/schedule';
import Event from './views/events/event';
import Pastor from './views/pastor/pastor';
import Bank from './views/bank/bank';
import Users from './views/users/user';


const customHistory = createBrowserHistory();

export default function Routes (){ 
return(
    <BrowserRouter>
        <Switch>
            <Router history={customHistory} >
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login}/>
                <Route path="/gr_em_casa" component={GrCasa}/>
                <Route path="/agenda" component={Schedule}/>
                <Route path="/evento" component={Event}/>
                <Route path="/pastores" component={Pastor}/>
                <Route path="/contas" component={Bank}/>
                <Route path="/usuarios" component={Users}/>
            </Router>
        </Switch>
    </BrowserRouter>
);
};