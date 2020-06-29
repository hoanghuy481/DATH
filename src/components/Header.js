import React , { Component } from 'react';
import {Link, Route, withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import moment from 'moment';
import { orderBy } from 'lodash';


import {actLogout, actSearch} from '../actions/index';
import  { postsRef } from '../firebase';

const menus = [
    {to: '/'                , exact: true,  name: 'Home'},
    {to: '/aboutus'         , exact: false, name: 'About Us'},
]
const MenuLink = ({menu})=>{
    return(
        <Route
            path={menu.to}
            exact={menu.exact}
            children={
                () =>{
                    return(
                        <li className={`dropdown`}>
                            <Link to={menu.to}>
                                {menu.name}
                            </Link>
                        </li>                     
                    )
                }
            }
        />
    )
}

class Header extends Component {
    constructor() {
        super()
        this.state = {
            query: '',
            noties: [],
            errors: {}
        }
    }
    componentDidMount(){
        postsRef.on('value', items =>{
            let data = []
            items.forEach(item=>{
                const {created, myuser, posts_id, seen, title, type, users_id, users_name, comments_id} = item.val();
                data.push({created, myuser, posts_id, seen, title, type, users_id, users_name, key: item.key,comments_id} );
            })
            this.setState({noties: data})
        })
    }
    handleChange = (event) => {
        const target = event.target;    // input selectbox
        const value  = target.type === 'checkbox' ? target.checked : target.value;
        const name   = target.name;

        this.setState({
            [name]: value
        });
    }
    logOut =(e) => {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/`)
        this.props.FormLogout();
    
    }
    showMenu(menus){
        let xhtml = null;
        if(menus.length >0){
            xhtml = menus.map((menu,index) =>{
                return(
                    <MenuLink menu={menu} key={index} />                    
                )
            })
        }
        return xhtml;
    }

    showNoti = (noties) =>{
        let xnoti = null
        if(noties.length > 0){
            xnoti = noties =  orderBy(noties, ['comments_id'],['desc'])
            .slice(0, 4)
            .map((noti, index) =>{
                if(noti.users_id !== this.props.user.uid && noti.myuser === this.props.user.uid){
                    let now = moment(noti.created).endOf('hour').fromNow();
                    return(
                        <li key={index} className="noti-li">
                            <div className="noti-a">
                                <Link to={`/my.profile/${noti.users_id}`}>{noti.users_name} </Link>
                                {noti.type} your post:
                            </div>
                            <div className="noti-a">
                                <Link to={`/track/${noti.posts_id}`}>{noti.title}</Link>
                                <p className="noti-p">{now}</p>
                            </div>
                        </li>
                    )
                } 
            })
        }
        return xnoti
    }
    handleSearch = (event) =>{
        let {query} = this.state
        if (event.key === 'Enter') {
            this.props.goSearch(query);
            this.props.history.push(`./../search/${query}`)
        }
        this.props.goSearch(query);
        this.props.history.push(`./../search/${query}`)
        event.preventDefault();
    }

    render(){
        let query = this.state.query;
        let uid = this.props.user.uid;
        let {noties} = this.state
        const loginRegLink = (
            <ul className="dropdown-menu login">
                <li><Link to="/login" >Login</Link></li>
                <li><Link to="/register" className="nav-link">Register</Link></li>
            </ul>
        )     
        const userLink = (
            <ul className="dropdown-menu login">
                <li><Link to={`/my.profile/${uid}`}>User</Link></li>
                <li ><a href="# " onClick={this.logOut.bind(this)}>Logout</a></li>
            </ul>
        )
        
        return(
            <header id="header">
                <nav className="navbar navbar-default navbar-fixed-top menu">
                    <div className="container">
                        {/* Brand and toggle get grouped for better mobile display */}
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            </button>
                            <Link to={`/`} className="navbar-brand"><img src="images/logo.png" alt="logo" /></Link>
                        </div>
                        {/* Collect the nav links, forms, and other content for toggling */}
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right main-menu">
                                {this.showMenu(menus)}
                                <li className="dropdown">
                                    <a href="# " className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">My Profile <span><img src="images/down-arrow.png" alt="" /></span></a>
                                    {localStorage.usertoken ? userLink : loginRegLink}
                                </li>
                                <li className="dropdown">
                                    <a href="# " className="dropdown-toggle pages" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-bell" aria-hidden="true"></i><span><img src="images/down-arrow.png" alt="" /></span>
                                    </a>
                                    <ul className="dropdown-menu page-list">
                                        {this.showNoti(noties)}
                                        <li className="noti-li">
                                            <div className="noti-a">
                                                <Link to={`/noti`}>View al notifications</Link>
                                            </div>
                                        </li>
                                        
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a href="# " className="dropdown-toggle pages" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Setting<span><img src="images/down-arrow.png" alt="" /></span></a>
                                    <ul className="dropdown-menu page-list">
                                        <li><Link to={`/setting`} >Setting </Link></li>
                                        <li><Link to={`/report`} >Report</Link></li>
                                    </ul>
                                </li>
                            </ul>
                            <form onSubmit={this.handleSearch} className="navbar-form navbar-right hidden-sm">
                                <div className="form-group">
                                    <Link to={`searchusers/${query}`} onClick={this.handleSearch} type="button">
                                        <i className="icon ion-android-search" />
                                    </Link>
                                    <input name="query" value={query} onChange={this.handleChange} type="text" className="form-control" placeholder="Search tracks" />
                                </div>
                            </form>
                        </div>
                        {/* /.navbar-collapse */}
                    </div>
                    {/* /.container */}
                </nav>
            </header>
       );
    }
} 
const mapStateToProps = state => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        goSearch : (search) =>{
            dispatch(actSearch(search))
        },
        FormLogout: () => {
            dispatch(actLogout());
        }
    }    

}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header));