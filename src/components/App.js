import React , { Component } from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from 'jwt-decode';


import {actLogin,actIsLogin, actGetPlaylist} from '../actions/index';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
// import Player from './Player';
import routes from './../route-config';
import { getUser } from '../components/api/UserFuncions';
import { getPlaylist } from '../components/api/PlaylistFuntion';


class App extends Component {
	
    getUser =  () => {
        if(localStorage.usertoken !== undefined){
            const token = localStorage.usertoken
            const decoded = jwt_decode(token)
            this.props.isLogin()
			 getUser(decoded.id).then(data => {
                this.props.users(data)    
            })     
             getPlaylist(decoded.id).then(data => {
                this.props.playlists([...data]) 
            })     
        }
    }
    componentWillUnmount(){
        this.getUser();
        
    }
    render(){
        this.getUser();
        
        return (
            <Router>
                <div className="App">
                <Header/>
                <ScrollToTop/>
                <div id="page-contents">
                    <div className="container">
                        {this.showRoutes(routes)}
                    </div>
                    {/* <Player/> */}
                </div>
                <Footer/>
                </div>
            </Router>
   
          );
    }

    showRoutes(routes){
        let xhtml = null;
        if(routes.length >0){
            xhtml = routes.map((route,index) =>{
                return(
                    <Route key="index" exact={route.exact} path={route.path}>
                        {route.main}
                    </Route>
                )
            })
        }
        return <Switch>{xhtml}</Switch>;
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
		users: (user) => {
            dispatch(actLogin(user));
		},
		isLogin: () => {
            dispatch(actIsLogin());
        },
        playlists: (playlists) =>{
            dispatch(actGetPlaylist(playlists));
        }
    }
}
export default connect(null,mapDispatchToProps)(App)
