import React , { Component } from 'react';
import { Link, Route } from "react-router-dom";
import {connect} from 'react-redux';

class SidebarSearch extends Component {
    showMenu = (menus, query) =>{
        let xhtml = null;
        if(menus.length >0){
            xhtml = menus.map((menu,index) =>{
                return(
                    <MenuLink menu={menu} query={query} key={index} />                    
                )
            })
        }
        return xhtml;
    }
    render(){
        let {query, user} = this.props
        
        return (
            <div className="col-md-3 static">
                <div className="profile-card">
                    <img src={`/images/users/${user.avatar}`} alt="user" className="profile-photo" />
                    <h5><Link to={`/my.profile/${user.uid}`} className="text-white">{user.first_name + " " + user.last_name}</Link></h5>
                    <Link to={`/followers/${user.uid}`} className="text-white"><i className="ion ion-android-person-add" /> {this.props.FollowersCount} followers</Link>
                </div>
                {/*profile card ends*/}
                <ul className="nav-news-feed">
                    {this.showMenu(menus, query)}
                </ul>
                {/*news-feed links ends*/}
            </div>
          );
    }
}

const menus = [
    {to: '/search/', exact: true, name: 'Everthing', className: 'fa fa-search'},
    {to: '/searchposts/', exact: true, name: 'Tracks', className: 'fa fa-list'},
    {to: '/searchusers/', exact: false, name: 'People', className: 'icon ion-ios-people'},
    {to: '/searchalbums/', exact: false, name: 'Album', className: 'icon ion-ios-videocam'}
]

const MenuLink = ({menu,query})=>{
    return(
        <Route
            path={menu.to+`${query}`}
            exact={menu.exact}
            children={
                ({match}) =>{
                    let active =(match !== null) ? "lightsteelblue" : "";
                    return(
                        <li style={{backgroundColor: `${active}`}} >
                            <i className={`${menu.className}`} />
                            <div>
                                <Link to={menu.to+`${query}`}>{menu.name}</Link>
                            </div>
                        </li>
                    )
                }
            }
        />
    )
}
const mapStateToProps = state => {
    return{
        user: state.user
    }
}


export default connect(mapStateToProps,null)(SidebarSearch);