import React , { Component } from 'react';
import {connect} from 'react-redux';
import { Route, Link } from 'react-router-dom';

import  ModalAvatar  from './Modal/ModalAvatar';
import ModalUserReport  from './Modal/ModalUserReport'
import { createFollow, unFollow, getFollowers } from '../api/FollowerFuntion';

class Menu extends Component {
    constructor() {
        super()
        this.state = {
            selectedFile: null,
            userFollowed:[],
            setFollow: true,
            errors: {}
        }
    }
    showMenu = (menus, uid) =>{
        let xhtml = null;
        if(menus.length >0){
            xhtml = menus.map((menu,index) =>{
                return(
                    <MenuLink menu={menu} uid={uid} key={index} />                    
                )
            })
        }
        return xhtml;
    }
    HandleUnfollow = (e) =>{
        e.preventDefault()
        unFollow(this.props.myuser.id, this.props.user.id).then(res => {
            this.getUserFollowed(this.props.user.id)
            this.setState({
                setLike: true
            })
        })      
    }
   
    HandleFollow = (e) => {
		e.preventDefault()
		const followers = {
            users_id: this.props.myuser.id,
			user_follow_id: this.props.user.id
		}
		createFollow(followers).then(res => {
            this.getUserFollowed(followers.user_follow_id)
        })     
    }
    componentDidMount(){
        if(this.props.user.id !== ''){
            this.getUserFollowed(this.props.user.id);
        }
    }

    componentDidUpdate(prevProps,prevState){
        if(prevProps.user.id !== this.props.user.id)
        {
            this.getUserFollowed(this.props.user.id);
        }   
        if(prevState.userFollowed !== this.state.userFollowed){
           if(this.state.userFollowed.findIndex(x=>x.uid === this.props.myuser.uid) === -1){
                this.setState({
                    setFollow: true
                })
            }else{
                this.setState({
                    setFollow: false
                })
            }            
        }
    }
    getUserFollowed = (id) =>{
        if(id !== ''){
            getFollowers(id).then(data => {
                this.setState({
                    userFollowed: [...data.data]
                })
            })
        }
    }

    render(){      
        let user = {id: '', first_name: '', last_name: '', email: '', password: '', created: '', avatar: '', uid:''};
        user = (this.props.user !== undefined) ? this.props.user : user;    
           
        let {userFollowed, setFollow} = this.state
        let FollowedCount = 0
        if(userFollowed.length > 0){
            FollowedCount = userFollowed.length       
        }
        let trueButtonFollow = <li><button onClick={this.HandleFollow} type="submit" className="btn-primary">Follow</button></li>
        if(setFollow === false){
            trueButtonFollow = <li><button onClick={this.HandleUnfollow} type="submit" className="btn-warning">Following</button></li>
        }
        let xhtmButtonlFollow = null; let xReport = null
        if(this.props.myuser.uid !== user.uid){
            xhtmButtonlFollow = trueButtonFollow
            xReport = <li><Link to="# " data-toggle="modal" data-target="#report" >Report</Link></li>
        }
        return (
            <div className="timeline-cover">
                <ModalAvatar getRe={this.props.getRe} user={user} getU={this.props.getU}/>
                {/*Timeline Menu for Large Screens*/}
                <div className="timeline-nav-bar hidden-sm hidden-xs">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="profile-info">
                                <div className="img-wrapper" data-toggle="modal" data-target="#imageProfile">
                                    <img src={`/images/users/${user.avatar}`} alt="" className="img-responsive profile-photo" />
                                </div>
                                <h3>{user.first_name} {user.last_name}</h3>
                                <p className="text-muted">{user.bio}</p>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <ul className="list-inline profile-menu">
                                {this.showMenu(menus,user.uid)}
                                {xReport}
                                <ModalUserReport user={this.props.user}/>
                            </ul>
                            <ul className="follow-me list-inline">
                                <li style={{margin: '10px'}}>Followed by <Link to={`/followers/${user.uid}`}> {FollowedCount} People</Link></li>
                                {xhtmButtonlFollow}
                            </ul>
                        </div>
                    </div>
                </div>
                {/*Timeline Menu for Large Screens End*/}
                {/*Timeline Menu for Small Screens*/}
                <div className="navbar-mobile hidden-lg hidden-md">
                    <div className="profile-info">
                        <img src={`/images/users/${user.avatar}`} alt="" className="img-responsive profile-photo" />
                        <h4>Sarah Cruiz</h4>
                        <p className="text-muted">Creative Director</p>
                    </div>
                    <div className="mobile-menu">
                        <ul className="list-inline">
                            <li><a href="timline.html" className="active">Timeline</a></li>
                            <li><a href="timeline-about.html">About</a></li>
                            <li><a href="timeline-album.html">Album</a></li>
                            <li><a href="timeline-friends.html">Friends</a></li>
                        </ul>
                        <button className="btn-primary">Add Friend</button>
                    </div>
                </div>
                {/*Timeline Menu for Small Screens End*/}
            </div>
        );
    }
}

const menus = [
    {to: `/my.profile/`     , exact: true, name: 'Timeline'},
    {to: '/list-playlist/'    , exact: false, name: 'Playlist'},
    {to: '/about/'       , exact: false, name: 'About'},
    {to: '/following/'    , exact: false, name: 'Following'},
]

const MenuLink = ({menu,uid})=>{
    return(
        <Route
            path={menu.to+`${uid}`}
            exact={menu.exact}
            children={
                ({match}) =>{
                    let active =(match !== null) ? "active" : "";
                    return(
                        <li>
                            <Link className={`${active}`} to={menu.to+`${uid}`}>{menu.name}</Link>
                        </li>
                    )
                }
            }
        />
    )
}

const mapStateToProps = state => {
    return {
        myuser: state.user
    }
}

export default connect(mapStateToProps,null)(Menu)