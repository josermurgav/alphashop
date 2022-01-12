import react, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClientiComponent from './Clienti/ClientiComponent';
import WelcomeComponent from './Welcome/WelcomeComponent';
import LoginComponent from './Login/LoginComponent';
import HeaderComponent from './Header/HeaderComponent';
import FooterComponent from './Footer/FooterComponent';
import LogoutComponent from './Logout/LogoutComponent';
import DatiClienteComponent from './Clienti/InsCliente/DatiClienteComponent';
import AuthRoute from './AuthRoute';
import ForbComponent from './Forbidden/ForbComponent';


export default class GestFidApp extends Component{

    state ={
        User:"ROLE_USER",
        Admin: "ROLE_ADMIN"
    }
    render()
    {
        return(

            <div className="GestFidApp"> 
                
                <Router>
                    <HeaderComponent/>  
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/login" component={LoginComponent} />
                        <Route path="/logout" component={LogoutComponent} />
                        <Route path="/forbidden" component={ForbComponent} />
                        <AuthRoute path="/clienti" component={ClientiComponent} role={this.state.User} />
                        <AuthRoute path="/welcome/:user" component={WelcomeComponent} role={this.state.User} /> 
                        <AuthRoute path="/inscliente/:codfid" component={DatiClienteComponent} role={this.state.Admin} />                     
                        <Route component={ErrorComponent} />  
                    </Switch>     
                    <FooterComponent/>                                 
                </Router>
                
                {/* <LoginComponent></LoginComponent> */}
            </div>
        )

    }
}





// const WelcomeComponent = (props) =>{

//     return (
//         <div>
//             <h3>Welcome</h3>
//             <p>Saluti {props.match.params.user}</p>
//             {/* <ClientiComponent></ClientiComponent> */}
//         </div>

//     );

// }

function ErrorComponent(){    
        return <div><h3>Errore pagina non trovata</h3></div>   

}